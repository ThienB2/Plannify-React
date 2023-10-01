const fs = require("fs");
const filePath = "mytext.txt";
const OpenAI = require('openai');

// Declare events array to be initialized later when reading file
const events = [];
const eventNames = [];
const eventSubjects = [];
const eventDeadlines = [];

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: 'APIKEY GOES HERE'
});

// Declare event class 
class Event {
  constructor(name, subject, deadline) {
    this.name = name;
    this.subject = subject;
    this.deadlineDate = deadline;
  }
}

// Sorting function to compare events by deadline date
function compareEventsByDate(eventA, eventB) {
  const dateA = eventA.deadlineDate;
  const dateB = eventB.deadlineDate;

  if (dateA <= dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
}

async function processEvents() {
  // Read the file asynchronously line by line
  try {
  const data = await fs.promises.readFile(filePath, 'utf8' );

    // String of the whole file
  let wholeFileStr = ''
  const linebreak = '\n'

  // Split the file content into an array of lines
  const lines = data.split('\n');

  // Loop through lines and create Event instances
  for (let i = 0; i < lines.length; i += 4) {
    const name = lines[i];
    const subject = lines[i + 1];
    const deadlineDate = new Date(lines[i + 2]);

    let time = ''
    if (deadlineDate.getHours() > 12) {
      time = (deadlineDate.getHours() - 12) + 'pm';
    } else {
      time = deadlineDate.getHours() + 'am'
    }

    wholeFileStr += name + linebreak + subject + linebreak + 'Deadline:' + time + linebreak + '\n';

    // Create an Event instance and push it to the events array
    const event = new Event(name, subject, deadlineDate);
    eventNames.push(name);
    eventSubjects.push(subject);
    eventDeadlines.push(deadlineDate)
    events.push(event);
  }

  events.sort(compareEventsByDate);

  // STUB BELOW FOR TESTING PURPOSES
  let i = 1;
  for (const event of events) {
    console.log('Event:');
    console.log('----------------');
    console.log(`Name: ${event.name}`);
    console.log(`Subject: ${event.subject}`);
    console.log(`Deadline: ${event.deadlineDate.toString()}`);
    console.log('----------------');
  }


    // Send prompt to ChatGPT
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: "user", content: `you are an assistant that outputs a schedule based on the users assignments that they need completed by a certain time. The user will provide the deadline of the assignment and you are to design a schedule to assist him in keeping track with the assignment. The user will provide the name of the assignment, subject, and the deadline. make sure the schedule strictly finishes no after the deadline. The user wants an hour by hour schedule of what they should be doing strictly in a specific format and nothing else. the format is [time: 10 word description of task] and the tasks are provided below:\n${wholeFileStr}`}],
        max_tokens: 500, // Adjust the number of tokens as needed
      });

      console.log('ChatGPT Response:');
      console.log(response.choices[0].message.content);
    } catch (error) {
      console.error('Error with ChatGPT:', error);
    }

    // UNTIL HERE

  } catch (err) {
    console.error(`Error reading the file: ${err}`);
  }
}

// // Call the async function to start processing events
processEvents(); 
