# NodeJs Mailer with Express, Sendgrid and Typescript

I've made this because simple websites(html & css) can't use contact forms without subscribing to some mailing service or creating their own backend server.

Now, all I have to do is create a form and point the action to 'https://justgetintouch.com', add method='POST' and that's it.

# Getting started

Create a form for your website, point the action to me and confirm your email address.


**NO REGISTRATION REQUIRED**

## Example

```html
<form action="https://justgetintouch.com/your_email@address.com" method="POST">
     <input type="text" name="name" required>
     <input type="email" name="email" required>
     <textarea name="message"></textarea>
     <button type="submit">Send</button>
</form>
```

## 1. Connect your form
Pointing the action-attribute of your form to this URL will enable submissions to be sent to your email address.

```html
<form action="https://justgetintouch.com/your_email@address.com" method="POST">
```

## 2. Add name attributes
Include a **name** attribute in all form elements  (i.e. ```<input>```, ```<select>```, and ```<textarea>```) to receive the submission data.

```html
<input type="email" name="email">
```

## 3. Send and confirm
Submit your form the first time to trigger an email requesting confirmation.
Once your confirm that you want to receive emails to that address from the respective website, you are ready to go!

## 4. Send users to a "Thank You" page (optional)

You can also send users to a "Thank You" page on your website.
All you have to do is add another input tag with the name ```_next``` and set the value to your page.

```html
<input type="text" name="_next" value="https://mydomain.com/thank-you-page">
```

## 5. Creating advanced forms:

You are not stuck with the usual 'email', 'name', etc fields.
The server receives the ```name``` field and its ```value```, so You can create any type of forms.

Example:

```html
<form action="https://justgetintouch.com/your_email@address.com" method="POST">
        <!-- The name can be anything. That's what you'll get in the email when the form is submitted -->
     <input type="text" name="What is your name?" required>
     <input type="email" name="What is your email address?" required>
     <input type="text" name="What colour do you like?">
     <input type="number" name="How old are you?">
     <textarea name="What do you want to tell me?"></textarea>
     <button type="submit">Send</button>
</form>
``
