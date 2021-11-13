<!-- ---
title: 'JGIT - Getting started'
description: 'How to get started using JGIT - Just Get In Touch - API'
excerpt: 'Create a form for your website, point the action to us and confirm your email address. Is that simple!'
--- -->

<div class="text-center">

# Getting started

Create a form for your website, point the action to me and confirm your email address.

<div class="has-bg">

**NO REGISTRATION REQUIRED**
</div>

</div>

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
Once your email address is confirmed, you are ready to go!


## 4. Send users to a "Thank You" page

You can also send users to a "Thank You" page on your website.
All you have to do is add another input tag with the name ```_next``` and set the value to your page.

```html
<input type="text" name="_next" value="https://mydomain.com/thank-you-page">
```

### There is no number 5, you're all set up and ready to roll!
