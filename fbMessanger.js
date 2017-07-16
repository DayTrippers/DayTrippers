// Constructor 
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(token[, notificationType])

messenger.sendTextMessage(<ID>, 'Hello') // Send a message with NO_PUSH, no callback 
 
// Send an image overriding default notification type with callback 
messenger.sendImageMessage(<ID>, <IMG URL>, 'REGULAR', function (err, body) {
  if (err) return console.error(err)
  console.log('Image sent successfully')
})
 
// Functions 
messenger.sendTextMessage(id, message[, notificationType][, cb]) // Sends a text message 
 
messenger.sendImageMessage(id, imageURL[, notificationType][, cb]) // Sends an image from URL 
 
messenger.sendHScrollMessage(id, elements[, notificationType][, cb]) // Sends an H-SCroll generic message 
 
messenger.sendButtonsMessage(id, message, buttons[, notificationType][, cb]) // Sends a buttons message 
 
messenger.sendReceiptMessage(id, payload[, notificationType][, cb]) // Sends a receipt message (No need for template_type in payload)  
 
messenger.sendQuickRepliesMessage(id, attachment, quickReplies[, notificationType][, cb]) // Sends a Quick Replies Message 
 
messenger.sendMessage(id, messageData[, notificationType][, cb]) // Send a message from custom data 
 
messenger.getProfile(id, cb) // Gets user information 
 
messenger.setWelcomeMessage(pageId, message[, cb]) // Sets Page's Welcome Message (message can be a text string or a strucuted message) 
 
messenger.setGreetingText (pageId, message[, cb]) // Sets Page's Greeting Text 
 
messenger.setPersistentMenu (pageId, menuItems[, cb]) // Set's Page's Persistent Meny 
 
messenger.sendThreadSettingsMessage (pageId, jsonObject[, cb]) // Send Manually Page's Thread Settings 