document.addEventListener('DOMContentLoaded', function() {
   // Admin Panel Toggle and Module Handling
   const adminPanel = document.querySelector('.admin-panel');
   const adminLink = document.querySelector('nav a[href="#Admin"]');
   const adminModules = document.querySelectorAll('.admin-modules button');
   const adminModuleDivs = {
       'contentManager': 'contentManagerModule',
       'userManager': 'userManagerModule',
       'permissionManager': 'permissionManagerModule',
       'analyticsManager': 'analyticsManagerModule',
       'integrationManager': 'integrationManagerModule',
       'systemLogs': 'systemLogsModule'
   };

   if (adminLink) {
       adminLink.addEventListener('click', (e) => {
           e.preventDefault();
           adminPanel.style.display = adminPanel.style.display === 'block' ? 'none' : 'block';
       });
   }

   adminModules.forEach(button => {
       button.addEventListener('click', () => {
           Object.values(adminModuleDivs).forEach(divId => {
               const div = document.getElementById(divId);
               div.style.display = (divId === adminModuleDivs[button.id]) ? 'block' : 'none';
           });
       });
   });

   // Live Feed with Simulated Websocket Updates and Error Handling
   const liveFeed = document.getElementById('liveFeed');
   if (liveFeed) {
       let updateCount = 0;
       setInterval(() => {
           try {
               const newItem = document.createElement('div');
               newItem.textContent = `Update ${++updateCount}: ${new Date().toLocaleTimeString()}`;
               liveFeed.prepend(newItem);
           } catch (error) {
               console.error('Error updating live feed:', error);
               const errorMsg = document.createElement('div');
               errorMsg.textContent = 'Live feed update failed.';
               errorMsg.style.color = 'red';
               liveFeed.prepend(errorMsg);
           }
       }, 3000);
   }

   // Trending Topics and Dashboard Subscriptions (Async Simulation)
   async function fetchSimulatedData(data) {
       return new Promise(resolve => {
           setTimeout(() => resolve(data), 500); // Simulate network delay
       });
   }

   async function populateTrendingTopics() {
       const topics = await fetchSimulatedData(['AI Revolution', 'Sustainable Living', 'Global Finance']);
       if (trendingTopics) {
           topics.forEach(topic => {
               const topicItem = document.createElement('div');
               topicItem.textContent = topic;
               trendingTopics.appendChild(topicItem);
           });
       }
   }

   async function populateSubscriptions() {
       const subscriptions = await fetchSimulatedData(['Tech Daily', 'Financial Weekly', 'Food Monthly']);
       if (dashboardSubscriptions) {
           subscriptions.forEach(sub => {
               const subItem = document.createElement('div');
               subItem.textContent = sub;
               dashboardSubscriptions.appendChild(subItem);
           });
       }
   }

   populateTrendingTopics();
   populateSubscriptions();

   // Faceted Filters with Data Fetching and Advanced Filtering
   const categoryFacets = document.getElementById('categoryFacets');
   const authorFacets = document.getElementById('authorFacets');
   const tagFacets = document.getElementById('tagFacets');
   const searchResults = document.getElementById('searchResults');
   let allNewsletters = [];

   async function fetchNewsletters() {
       allNewsletters = await fetchSimulatedData([
           { title: 'AI Breakthrough', category: 'Technology', author: 'John Doe', tags: ['AI', 'Machine Learning'], date: new Date(2023, 10, 15) },
           { title: 'Market Analysis', category: 'Finance', author: 'Jane Smith', tags: ['Finance', 'Stocks'], date: new Date(2023, 10, 20) },
           { title: 'Gourmet Recipes', category: 'Food', author: 'Alice Johnson', tags: ['Recipes', 'Cooking'], date: new Date(2023, 10, 25) }
       ]);
       updateSearchResults();
   }

   async function fetchFacets(type) {
       const data = await fetchSimulatedData(['Technology', 'Finance', 'Food']); // Simulating a server call.
       if (type === 'category') {
           data.forEach(category => {
               const facetItem = document.createElement('label');
               facetItem.innerHTML = `<input type="checkbox" value="${category}"> ${category}`;
               categoryFacets.appendChild(facetItem);
           });
       }
   }

   function updateSearchResults() {
       if (searchResults && allNewsletters.length > 0) {
           searchResults.innerHTML = '';
           const selectedCategories = Array.from(categoryFacets.querySelectorAll('input:checked')).map(cb => cb.value);
           const selectedAuthors = Array.from(authorFacets.querySelectorAll('input:checked')).map(cb => cb.value);
           const selectedTags = Array.from(tagFacets.querySelectorAll('input:checked')).map(cb => cb.value);
           const startDate = document.getElementById('startDate').value;
           const endDate = document.getElementById('endDate').value;

           const filteredNewsletters = allNewsletters.filter(newsletter => {
               const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(newsletter.category);
               const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(newsletter.author);
               const tagMatch = selectedTags.length === 0 || newsletter.tags.some(tag => selectedTags.includes(tag));
               const dateMatch = (!startDate || newsletter.date >= new Date(startDate)) && (!endDate || newsletter.date <= new Date(endDate));
               return categoryMatch && authorMatch && tagMatch && dateMatch;
           });

           filteredNewsletters.forEach(newsletter => {
               const resultItem = document.createElement('div');
               resultItem.textContent = newsletter.title;
               searchResults.appendChild(resultItem);
           });
       }
   }

   fetchNewsletters();
   fetchFacets('category');

   if (categoryFacets && authorFacets && tagFacets) {
       categoryFacets.addEventListener('change', updateSearchResults);
       authorFacets.addEventListener('change', updateSearchResults);
       tagFacets.addEventListener('change', updateSearchResults);
       document.getElementById('startDate').addEventListener('change', updateSearchResults);
       document.getElementById('endDate').addEventListener('change', updateSearchResults);

   }

   // Notification List Simulation
   const notificationList = document.getElementById('notificationList');
   if (notificationList) {
       const notifications = ['New AI article published.', 'Market analysis update.', 'New recipe added.'];
       notifications.forEach(notification => {
           const notificationItem = document.createElement('div');
           notificationItem.textContent = notification;
           notificationList.appendChild(notificationItem);
       });
   }

   // Example User Settings (Replace with actual user settings handling)
   const userSettings = document.getElementById('userSettings');
   if (userSettings) {
       const settings = ['Dark Mode', 'Email Notifications', 'Location Services'];
       settings.forEach(setting => {
           const settingItem = document.createElement('label');
           settingItem.innerHTML = `<input type="checkbox"> ${setting}`;
           userSettings.appendChild(settingItem);
       });
   }
});
function promptAndRedirect(message, defaultValue, redirectUrl) {
    let userInput = window.prompt(message, defaultValue);
  
    if (userInput !== null) {
      // Optionally, you can perform some validation or processing of userInput here.
      // For example, you might want to encode it if it's going to be part of a URL.
  
      // Construct the redirect URL, potentially including the user's input.
      let finalRedirectUrl = redirectUrl;
  
      // Example of adding user input as a query parameter (if needed):
      // finalRedirectUrl += "?userInput=" + encodeURIComponent(userInput);
  
      window.location.href = finalRedirectUrl; // Redirect to the specified URL.
    } else {
      console.log("User cancelled the prompt.");
    }
  }
  
  // Example usage:
  let targetUrl = "survey.html"; // Replace with your desired URL.
  
  //Example to add user input to the url as a parameter.
  function promptAndRedirectWithParameter(message, defaultValue, redirectUrl, parameterName) {
    let userInput = window.prompt(message, defaultValue);
  
    if (userInput !== null) {
      let finalRedirectUrl = redirectUrl;
  
      finalRedirectUrl += "?" + parameterName + "=" + encodeURIComponent(userInput);
  
      window.location.href = finalRedirectUrl;
    } else {
      console.log("User cancelled the prompt.");
    }
  }
  
  let targetUrlWithParameter = "survey.html";
  promptAndRedirectWithParameter("Please take this survey first:", "", targetUrlWithParameter, "query");