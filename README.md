# Social Feed App

Welcome to the Social Feed App! This project is a social feed application built using VueJS and NuxtJS. It allows users to view posts similar to any social network platform, interact with posts by reacting, commenting, and sharing, and explore posts of specific users.

## Features

- View posts with creator information, post content, reactions, comments, and share functionality.
- Interact with posts by reacting, commenting, and sharing.
- Explore posts of specific users by visiting their user feed page.
- Infinite scrolling to load posts dynamically.
- Responsive design for optimal viewing across devices.
- Cross-browser compatibility for a seamless experience on different browsers.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/ZeinabAbdelghaffar/social-feed-app.git
```

2. Navigate to the project directory:

```
cd social-feed-app
```

3. Install dependencies:

```
npm install
```

4. Run the development server:

```
npm run dev
```

5. Open your browser and visit `http://localhost:3000` to view the application.

## APIs

This project utilizes mock APIs provided by [dummyjson.com](https://dummyjson.com/). These APIs serve user data, posts, and comments. Pagination is supported, allowing for fetching more data with the use of query parameters.

## Design

The design of the application is focused on being unique, elegant, and clean, following cutting-edge trends with easy navigation. It is responsive, ensuring optimal viewing across devices of any size. Cross-browser compatibility is ensured for a seamless experience across different browsers.

## Project Structure

The project structure is organized as follows:

- **.nuxt**: Contains Nuxt.js build files.
- **node_modules**: Contains project dependencies.
- **static**: Contains static assets such as images or fonts.
- **test**: Contains test files.
- **services**: Contains API service files.
  - **Api.js**: Handles API requests.
- **components**: Contains Vue components used in the application.
  - **PostContainer.vue**: Manages the layout of a post.
  - **CreatorArea.vue**: Displays information about the post creator.
  - **ActionsArea.vue**: Handles actions such as reactions, comments, and shares.
  - **CommentsArea.vue**: Displays comments and handles comment-related actions.
  - **FooterArea.vue**: Footer component.
  - **HeaderArea.vue**: Header component.
- **pages**: Contains Vue components used as pages.
  - **FeedPage.vue**: The main feed page.
  - **UserFeedPage.vue**: User-specific feed page.
- **router**: Contains routing configuration.
  - **index.js**: Defines application routes.
- **store**: Contains Vuex store files.
  - **index.js**: Main Vuex store configuration.
- **.babelrc**: Babel configuration file.
- **.editorconfig**: Editor configuration file.
- **.eslintrc.js**: ESLint configuration file.
- **.gitignore**: Git ignore file.
- **jest.config.js**: Jest configuration file.
- **jsconfig.json**: JavaScript configuration file.
- **nuxt.config.js**: Nuxt.js configuration file.
- **package.json**: Project metadata and dependencies.
- **package-lock.json**: Dependency lock file.

## Post Structure

![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/69b9de2f-36fc-4877-90be-ea3db1e4a355)

The Post consists of 3 main areas:

1. **The Creator area**:
   - Image of the creator
   - Name of the creator
   - Username of the creator
   - Post Title
   - Post content
![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/8d284a38-ba4b-4e3a-9e1c-5a54d7225a1b)

2. **Actions area**:
   - Reaction icon (any random icon) + reaction count
   - React button
   - Comment button
   - Share button
![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/847e802b-6a19-4451-bbbb-1817e4f4bcdf)

3. **Comments area**:
   - Link to load more comments
   - List of comments:
     - Image of the comment owner
     - Name of the comment owner
     - Username of the comment owner
     - Comment text
   - Write a comment area that is hidden by default
![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/374f6ef3-7d48-4c3a-a92b-f8cfa69411c1)

## Acceptance Criteria

| Acceptance Criteria | Description | Screenshot |
|----------------------|-------------|------------|
| 1. Post Creator's Name | Display the post creator's name as first name + last name. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/76eb3e7d-00c6-4a6d-b28e-41b102dddc17) |
| 2. Post Creator Username | Start the post creator's username with "@" symbol. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/28a03776-ff7e-4215-a1a9-19b39a28cea9) |
| 3. Post Content Limit | Limit post content to 50 characters, with an ellipsis (...) indicating truncated content. Clicking on the ellipsis reveals the full content. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/e4e8d287-b79d-4f55-ab3d-d9b3b195e0c9)  ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/7bff7c29-393e-408f-b8db-1b1e80a36060) |
| 4. Reaction Icon | Use any icon for reactions (e.g., like). |![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/e983e368-a93c-4eac-9ce9-55cefa78d772) |
| 5. React Button Functionality | Increase reaction count and change button state upon clicking. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/30f19688-c6fe-4650-b708-942c641e007d) |
| 6. Undo React | Decrease reaction count and change button state upon re-clicking. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/4b540c0e-9797-4204-8821-45211bbcd12c) |
| 7. Comment Button | Show write comment area below comments list with fade animation upon clicking. |![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/c28b107a-cf63-480e-be2a-4ec597ea545b) |
| 8. Share Button | Display basic modal with random post URL and copy button upon clicking. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/54fb5cc5-24f5-4b15-887d-659cb7d2a99f) ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/153de62f-5f50-4e44-ba70-fbc1f3c6117e) |
| 9. Comments Pagination | Initially show 2 comments, load 3 more comments upon clicking "View More" until all comments are loaded. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/16b5265c-300a-4ab5-80e8-0bfa7cbe05a0) ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/7716e7ba-fe75-4c94-89c2-4b599e2e0d3f) |
| 10. Comments List Height | Set max height of comments list to display 4 comments with scrolling. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/32546abb-8ecd-4d47-a362-68bd5a244ad9) |
| 11. Comment Area | Design comment area as per wireframe with same rules as post. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/97c9e99b-8f6a-4a29-8bea-6267fdd7dee6) |
| 12. User Redirect | Redirect to new feed page in new tab upon clicking username in comments section. |![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/3a3d34a5-87f5-4cee-b2c0-f8a7c6a114bb) ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/b5d24773-4856-483d-9945-87ae1205ba58) |
| 13. Comment Placement | Show user's comment at top of comments upon posting. |![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/1c6a7ee9-b4ba-4da3-b524-32d4ff644515) ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/c038693c-3a1a-44ee-9454-7dfb9085554e)|
| 14. Infinite Scrolling | Implement infinite scrolling to load 1 post at a time upon scrolling. | ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/803f4dd4-e857-4241-9d31-7c95e3feb452) ![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/4e446e20-fa00-42f4-8a93-cfe04738720f)|
| 15. End of Feed Indicator | Display "No New Posts" text at end of page when no new posts are available. |![image](https://github.com/ZeinabAbdelghaffar/social-feed-app/assets/87963230/6670b8c5-75ed-427f-9de9-0267c9c1f959)|
| 16. Local Actions | Implement react and comment actions locally without APIs. | |

## Contributing

Contributions to this project are welcome. If you have any suggestions or improvements, feel free to create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Developed as a coding assessment task by **Zeinab Abdelghafar**.

| 📱 Phone:            | 📧 Email:                   | 📞 LinkedIn:              | 📚 GitHub:                  |
|---------------------|---------------------------|---------------------------|----------------------------|
| +201289939695       | zeinanabdo88@gmail.com   | Zeinab Abdelghafar        | ZeinabAbdelghaffar        |
