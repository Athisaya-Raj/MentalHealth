const Message = require('../models/Message');
const Student = require('../models/Student');

// Keywords that trigger HIGH priority tagging
const HIGH_PRIORITY_KEYWORDS = [
  'stress', 'stressed', 'anxiety', 'anxious', 'overwhelmed',
  'depressed', 'depression', 'panic', 'burnout', 'exhausted',
  'hopeless', 'helpless', 'crisis', 'breakdown', 'suicidal',
  'cant cope', "can't cope", 'too much', 'falling apart',
];

const tagPriority = (text) => {
  const lower = text.toLowerCase();
  return HIGH_PRIORITY_KEYWORDS.some(kw => lower.includes(kw)) ? 'high' : 'low';
};

// Resolve a student name from sender_id (ObjectId string, email, or dummy string)
const resolveStudentName = async (sender_id) => {
  if (!sender_id) return 'Student';
  try {
    // Try ObjectId lookup first
    const byId = await Student.findById(sender_id).select('name').lean();
    if (byId) return byId.name;
  } catch (_) { /* not a valid ObjectId */ }
  try {
    // Try email lookup (students who logged in with real email)
    const byEmail = await Student.findOne({ email: sender_id }).select('name').lean();
    if (byEmail) return byEmail.name;
  } catch (_) { /* ignore */ }
  // Return a readable label for dummy IDs
  if (sender_id === 'dummy-student-id') return 'Demo Student';
  return 'Student';
};

// POST /api/messages/send
const sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;

    if (!sender_id || !receiver_id || !message) {
      return res.status(400).json({ message: 'sender_id, receiver_id and message are required' });
    }

    const priority = tagPriority(message);
    const doc = new Message({ sender_id, receiver_id, message, priority });
    await doc.save();

    console.log(`[Message saved] sender=${sender_id} → receiver=${receiver_id} | priority=${priority} | "${message.slice(0, 60)}"`);
    res.status(201).json({ message: 'Message sent', priority, data: doc });
  } catch (err) {
    console.error('sendMessage error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/teacher/alerts?mentor_id=<id>
const getAlerts = async (req, res) => {
  try {
    const { mentor_id } = req.query;
    if (!mentor_id) return res.status(400).json({ message: 'mentor_id query param required' });

    const messages = await Message.find({ receiver_id: mentor_id })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    console.log(`[getAlerts] mentor_id=${mentor_id} → found ${messages.length} message(s)`);

    // Enrich with student names
    const enriched = await Promise.all(
      messages.map(async (msg) => {
        const studentName = await resolveStudentName(msg.sender_id);
        return { ...msg, studentName };
      })
    );

    // Fallback: if DB is empty, return one dummy alert so UI is never blank
    if (enriched.length === 0) {
      console.log('[getAlerts] No messages found — returning fallback dummy alert');
      return res.json([{
        _id:         'fallback-1',
        sender_id:   'dummy-student-id',
        receiver_id: mentor_id,
        studentName: 'Rohan (Demo)',
        message:     'Feeling stressed about academics and upcoming project deadlines.',
        priority:    'high',
        timestamp:   new Date().toISOString(),
        source:      'fallback',
      }]);
    }

    res.json(enriched);
  } catch (err) {
    console.error('getAlerts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/teacher/students?mentor_id=<id>
const getMenteeList = async (req, res) => {
  try {
    const { mentor_id } = req.query;
    if (!mentor_id) return res.status(400).json({ message: 'mentor_id query param required' });

    const students = await Student.find({ mentor_id }).select('-password').lean();
    console.log(`[getMenteeList] mentor_id=${mentor_id} → found ${students.length} student(s)`);
    res.json(students);
  } catch (err) {
    console.error('getMenteeList error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage, getAlerts, getMenteeList };
