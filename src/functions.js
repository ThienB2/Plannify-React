const fs = require('fs');
const filePath = "mytext.txt";
const OpenAI = require('openai');
import { apikey } from "apikeys.js";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: apikey, // Add API key
});

// Declare events array to be initialized later when reading file
const events = [];



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
    const data = await fs.promises.readFile(filePath, 'utf8');

    // Split the file content into an array of lines
    const lines = data.split('\n');

    // Loop through lines and create Event instances
    for (let i = 0; i < lines.length; i += 4) {
      const name = lines[i];
      const subject = lines[i + 1];
      const deadlineDate = new Date(lines[i + 2]);

      // Create an Event instance and push it to the events array
      const event = new Event(name, subject, deadlineDate);
      events.push(event);
    }

    events.sort(compareEventsByDate);

    // STUB BELOW FOR TESTING PURPOSES
    for (const event of events) {
      console.log('Event:');
      console.log(`Name: ${event.name}`);
      console.log(`Subject: ${event.subject}`);
      console.log(`Deadline: ${event.deadlineDate.toString()}`);
      console.log('----------------');

      // Send prompt to ChatGPT
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{role: "user", content: ""}],
          max_tokens: 30, // Adjust the number of tokens as needed
        });

        console.log('ChatGPT Response:');
        console.log(response.data.choices[0].message.content);
      } catch (error) {
        console.error('Error with ChatGPT:', error);
      }
    }

    // UNTIL HERE

  } catch (err) {
    console.error(`Error reading the file: ${err}`);
  }
}

// Call the async function to start processing events
processEvents();