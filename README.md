# Qikserve Frontend Challenge

## Description

This project aims to create a flexible restaurant menu application, capable of adapting to diverse restaurant branding through dynamic theming and imagery. Furthermore, it emphasizes SEO and accessibility best practices. This challenge is presented by Qikserve for a Frontend developer position.

## Technologies

This project was created using the Vite build tool.

To evaluate core skills, the project intentionally limited the use of external technologies and libraries, focusing on:

- `React`
- `Typescript`
- `ES6+`
- `React Hooks`
- `Redux`

Two extra libraries were added:

- `i18n-react` : was used for internationalization, providing support for English and Brazilian Portuguese translations.
- `lucide-react` : To add some icons.

## How to run?

1. Clone the repo on your local:

```
https://github.com/KlingerMatheus/Qikserve-Front-end-Challenge.git qikserve-challenge
```

2. Open the project:

```
cd qikserve-challenge
```

3. Install the packages:

```
npm install
```

4. Then run the app:

```
npm run dev
```

5. So the app will be running in `http://localhost:5173/`

## Assumptions

The inclusion of extra libraries served specific purposes. i18n-react was selected to implement multilingual support, a key differentiator, offering English (US) and Portuguese (BR) translations. My familiarity with this widely-used library facilitated its integration. Furthermore, lucide-react was employed to resolve two necessary icons from Figma, leveraging my previous experience.

For deployment, I used Vercel, which I'm familiar with, to expedite the process and concentrate on coding.

So, the Figma design had some issues that affected what I could do. Stuff like the 'Subtotal' value was kinda vague, and the order process wasn't fully there – the checkout just acted like it worked, no real payment stuff. Plus, I couldn't do the 'Contact' and 'Login' pages because they weren't in the design.

Oh, and I figured the search bar would work for each section, not for the whole thing, that's why it was implemented like that, no details were provided. Also, the "View allergy information" has not an action, I would implement a modal for it to show information about it.

## Final thoughts

To enhance my skills and portfolio, I intend to continue working on this project post-challenge. This will involve incorporating unit tests using React Testing Library, developing contact and login pages, implementing full checkout functionality with payment integration, and adding user features such as order history and custom profiles.
