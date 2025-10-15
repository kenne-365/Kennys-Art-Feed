// Paste your Firebase configuration here
const firebaseConfig = {
    apiKey: "AIzaSyCH98USlYsm5EN7x-5WZbLxMtJlDRnCdfU",
    authDomain: "kennychris-594b2.firebaseapp.com",
    projectId: "kennychris-594b2",
    storageBucket: "kennychris-594b2.appspot.com",
    messagingSenderId: "1526701784",
    appId: "1:1526701784:web:1d6d6358536f09d35801ad"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- GLOBAL VARIABLES ---
const adminUID = "scUch5Y2OrSjo7tRSPQCu2sIzet1";
let currentUserProfile = {};
let currentLang = 'en';

// --- CONTENT DATA ---
const myPosts = [
    { id: 'post005', type: 'image', titleKey: 'post_title_005', descKey: 'post_desc_005', fileUrl: 'images/Render.png', tags: ['Gift', 'Art', 'Clip Studio Paint', 'Digital'] },
    { id: 'post004', type: 'image', titleKey: 'post_title_004', descKey: 'post_desc_004', fileUrl: 'images/InTheNight.png', tags: ['OC', 'Art', 'Ibis Paint X', 'Digital'] },
    { id: 'post003', type: 'video', titleKey: 'post_title_003', descKey: 'post_desc_003', fileUrl: 'videos/BiMeme.mp4', tags: ['SBWHS', 'Fan Animation', 'Alight Motion', 'Digital', 'Animation Meme'] },
    { id: 'post002', type: 'image', titleKey: 'post_title_002', descKey: 'post_desc_002', fileUrl: 'images/N0S3NS3&Chase.png', tags: ['SBWHS', 'Fan Art', 'Ibis Paint X', 'Digital', 'Fan OCs'] },
    { id: 'post001', type: 'image', titleKey: 'post_title_001', descKey: 'post_desc_001', fileUrl: 'images/DrGaggleFanart.png', tags: ['SBWHS', 'Fan Art', 'Ibis Paint X', 'Digital'] }
];
const fanartPosts = [];
const myCharacters = [
    {
        id: "kenny", nameKey: "char_name_kenny", iconUrl: "characters/icons/kenny_icon.png",
        tags: ["Alien", "Sona"],
        baseInfo: { sexuality: "char_kenny_sexuality", status: "char_kenny_status", occupation: "char_kenny_occupation", language: "char_kenny_language", disorders: "char_kenny_disorders" },
        forms: [{
            formId: "main", nameKey: "char_name_kenny", refSheetUrl: "characters/kenny_ref.png",
            quoteKey: "char_kenny_quote", descriptionKey: "char_kenny_description", designNotesKey: "char_kenny_designNotes",
            specificInfo: { fullName: "char_kenny_fullName", species: "char_kenny_species", age: "char_kenny_age", gender: "char_kenny_gender", pronouns: "char_kenny_pronouns", height: "char_kenny_height", weight: "char_kenny_weight", build: "char_kenny_build" }
        }]
    },
    {
        id: "lane", nameKey: "char_name_lane", iconUrl: "characters/icons/lane_icon.gif",
        tags: ["Shapeshifter", "Furry", "Fursona"],
        baseInfo: { sexuality: "char_lane_sexuality", status: "char_lane_status", build: "char_lane_build", occupation: "char_lane_occupation", language: "char_lane_language", disorders: "char_lane_disorders", magic: "char_lane_magic" },
        forms: [
            { formId: "main", nameKey: "char_name_lane", refSheetUrl: "characters/lane_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lane_designNotes", specificInfo: { fullName: "char_lane_fullName", species: "char_lane_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_lane_pronouns", height: "char_lane_height", weight: "char_lane_weight" } },
            { formId: "lynn", nameKey: "char_lynn_nickname", refSheetUrl: "characters/lynn_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lynn_designNotes", specificInfo: { nickname: "char_lynn_nickname", species: "char_lynn_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_lynn_pronouns", height: "char_lynn_height", weight: "char_lynn_weight" } },
            { formId: "lex", nameKey: "char_lex_nickname", refSheetUrl: "characters/lex_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lex_designNotes", specificInfo: { nickname: "char_lex_nickname", species: "char_lex_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_lex_pronouns", height: "char_lex_height", weight: "char_lex_weight" } },
            { formId: "lee", nameKey: "char_lee_nickname", refSheetUrl: "characters/lee_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lee_designNotes", specificInfo: { nickname: "char_lee_nickname", species: "char_lee_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_lee_pronouns", height: "char_lee_height", weight: "char_lee_weight" } },
            { formId: "loren", nameKey: "char_loren_nickname", refSheetUrl: "characters/loren_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_loren_designNotes", specificInfo: { nickname: "char_loren_nickname", species: "char_loren_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_loren_pronouns", height: "char_loren_height", weight: "char_loren_weight" } }
        ]
    }
];

// --- TRANSLATION FUNCTION ---
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translations[lang][key] || el.textContent;
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        el.placeholder = translations[lang][key] || el.placeholder;
    });
    if (document.getElementById('post-grid')) {
        const searchInput = document.getElementById('search-input');
        displayPosts(searchInput ? searchInput.value : '');
    }
    if (document.getElementById('post-detail-container')) {
        loadPostDetailPage();
    }
    if (document.getElementById('character-gallery-grid')) {
        const characterSearchInput = document.getElementById('character-search-input');
        displayCharacterGallery(characterSearchInput ? characterSearchInput.value : '');
    }
    if (document.getElementById('character-profile-container')) {
        loadCharacterProfile();
    }
}

// --- RENDER & INTERACTION FUNCTIONS ---
function displayPosts(searchQuery = '') {
    displayContent(searchQuery, myPosts, 'post-grid');
    displayContent(searchQuery, fanartPosts, 'fanart-grid');
}
function displayContent(searchQuery, contentArray, gridId) {
    const postGrid = document.getElementById(gridId);
    if (!postGrid) return;
    const langDict = translations[currentLang];
    if (contentArray.length === 0) {
        postGrid.innerHTML = `<p style="grid-column: 1 / -1;">${langDict.no_posts_yet}</p>`;
        return;
    }
    const lowerCaseQuery = (searchQuery || '').toLowerCase();
    const filteredPosts = contentArray.filter(post => {
        const title = langDict[post.titleKey] || '';
        const description = langDict[post.descKey] || '';
        const titleMatch = title.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = description.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return titleMatch || descriptionMatch || tagsMatch;
    });
    postGrid.innerHTML = '';
    if (filteredPosts.length === 0 && searchQuery) {
        postGrid.innerHTML = `<p style="grid-column: 1 / -1;">No results found in this section.</p>`;
        return;
    }
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        const postTitle = langDict[post.titleKey];
        const postDesc = langDict[post.descKey];
        
        let mediaElement;
        if (post.type === 'image') {
            mediaElement = `<img src="${post.fileUrl}" alt="${postTitle}">`;
        } else {
            // Reverted to a simple, single-source video tag
            mediaElement = `<video controls autoplay muted loop playsinline src="${post.fileUrl}"></video>`;
        }

        const tagsHTML = post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('');
        postElement.innerHTML = `
            ${mediaElement}
            <div class="post-info"><button class="post-title-button" onclick="goToPost('${post.id}')"><h3>${postTitle}</h3></button><p>${postDesc}</p></div>
            <div class="tags-container">${tagsHTML}</div>
            <div class="post-actions">
                <button id="like-btn-${post.id}" class="like-btn" onclick="toggleLike('${post.id}')"></button>
                <button onclick="sharePost('${post.id}')">${langDict.share}</button>
            </div>
            <div class="comments-section">
                <h4 data-translate="comments">${langDict.comments}</h4>
                <div class="comments-container" id="comments-${post.id}"></div>
                <div class="add-comment-form">
                    <textarea id="comment-input-${post.id}"></textarea>
                    <button onclick="addComment('${post.id}')">${langDict.submit}</button>
                </div>
            </div>
        `;
        postGrid.appendChild(postElement);
        loadComments(post.id);
        updateLikeButton(post.id);
    });
}

function goToPost(postId) {
    window.location.href = `post.html?id=${postId}`;
}
function loadPostDetailPage() {
    const container = document.getElementById('post-detail-container');
    if (!container) return;
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (!postId) { container.innerHTML = `<p>Post not found.</p>`; return; }
    let post = myPosts.find(p => p.id === postId) || fanartPosts.find(p => p.id === postId);
    if (!post) { container.innerHTML = `<p>Post not found.</p>`; return; }
    const langDict = translations[currentLang];
    const postTitle = langDict[post.titleKey];
    const postDesc = langDict[post.descKey];

    const postElement = document.createElement('div');
    postElement.classList.add('post-item');
    
    let mediaElement;
    if (post.type === 'image') {
        mediaElement = `<img src="${post.fileUrl}" alt="${postTitle}">`;
    } else {
        mediaElement = `<video controls autoplay muted loop playsinline src="${post.fileUrl}"></video>`;
    }

    const tagsHTML = post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('');
    postElement.innerHTML = `
        ${mediaElement}
        <div class="post-info"><h3>${postTitle}</h3><p>${postDesc}</p></div>
        <div class="tags-container">${tagsHTML}</div>
        <div class="post-actions">
            <button id="like-btn-${post.id}" class="like-btn" onclick="toggleLike('${post.id}')"></button>
            <button onclick="sharePost('${post.id}')">${langDict.share}</button>
        </div>
        <div class="comments-section">
            <h4 data-translate="comments">${langDict.comments}</h4>
            <div class="comments-container" id="comments-${post.id}"></div>
            <div class="add-comment-form">
                <textarea id="comment-input-${post.id}"></textarea>
                <button onclick="addComment('${post.id}')">${langDict.submit}</button>
            </div>
        </div>
    `;
    container.innerHTML = '';
    container.appendChild(postElement);
    loadComments(post.id);
    updateLikeButton(post.id);
}

function displayCharacterGallery(searchQuery = '') {
    const grid = document.getElementById('character-gallery-grid');
    if (!grid) return;
    const langDict = translations[currentLang];
    const lowerCaseQuery = (searchQuery || '').toLowerCase();
    const filteredChars = myCharacters.filter(char => {
        const name = langDict[char.nameKey] || '';
        const nameMatch = name.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = char.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return nameMatch || tagsMatch;
    });
    grid.innerHTML = '';
    filteredChars.forEach(char => {
        const charName = langDict[char.nameKey] || 'Name not found';
        const tagsHTML = char.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const card = document.createElement('a');
        card.href = `character-profile.html?id=${char.id}`;
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${char.iconUrl}" alt="${charName}">
            <h4>${charName}</h4>
            <div class="tags-container">
                ${tagsHTML}
            </div>
        `;
        grid.appendChild(card);
    });
}
function loadCharacterProfile() {
    try {
        const container = document.getElementById('character-profile-container');
        const header = document.getElementById('character-name-header');
        const tabsContainer = document.getElementById('form-tabs-container');
        if (!container || !header || !tabsContainer) return;
        const urlParams = new URLSearchParams(window.location.search);
        const charId = urlParams.get('id');
        const character = myCharacters.find(c => c.id === charId);
        if (!character) {
            container.innerHTML = "<p>Character not found.</p>";
            header.textContent = "Error";
            return;
        }
        const langDict = translations[currentLang];
        const mainCharName = langDict[character.nameKey];
        header.textContent = mainCharName;
        tabsContainer.innerHTML = '';
        if (character.forms && character.forms.length > 1) {
            character.forms.forEach(form => {
                const tab = document.createElement('button');
                tab.className = 'form-tab';
                tab.textContent = langDict[form.nameKey];
                tab.dataset.charId = charId;
                tab.dataset.formId = form.formId;
                tabsContainer.appendChild(tab);
            });
            tabsContainer.querySelectorAll('.form-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    renderCharacterForm(tab.dataset.charId, tab.dataset.formId);
                });
            });
        }
        renderCharacterForm(charId, character.forms[0].formId);
    } catch (error) {
        console.error("Failed to load character profile:", error);
        const container = document.getElementById('character-profile-container');
        if (container) container.innerHTML = `<p>An error occurred. Check the console (F12) for details.</p>`;
    }
}
function renderCharacterForm(charId, formId) {
    try {
        const container = document.getElementById('character-profile-container');
        const character = myCharacters.find(c => c.id === charId);
        const form = character.forms.find(f => f.formId === formId);

        if (!character || !form) { throw new Error("Character or form data is missing."); }

        document.querySelectorAll('#form-tabs-container .form-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.formId === formId);
        });

        const langDict = translations[currentLang];
        const fullBasicInfo = { ...character.baseInfo, ...form.specificInfo };
        let basicInfoHTML = '<dl>';
        const infoFieldOrder = [ 'fullName', 'nickname', 'species', 'age', 'gender', 'pronouns', 'sexuality', 'status', 'height', 'weight', 'build', 'occupation', 'language', 'disorders', 'magic' ];
        
        infoFieldOrder.forEach(key => {
            if (fullBasicInfo[key]) {
                const label = langDict[`info_${key}`] || key;
                const valueKey = fullBasicInfo[key];
                const value = langDict[valueKey];
                if (label && value) {
                    basicInfoHTML += `<dt>${label}</dt><dd>${value}</dd>`;
                }
            }
        });
        basicInfoHTML += '</dl>';

        const description = (langDict[form.descriptionKey] || '').replace(/\n/g, '<br>');
        const designNotes = (langDict[form.designNotesKey] || '').replace(/\n/g, '<br>');
        const quote = (langDict[form.quoteKey] || '');
        const tagsHTML = character.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // This will be the name of the downloaded file, e.g., "lane_lynn_ref.png"
        const downloadFilename = `${character.id}_${form.formId}_ref.png`;

        container.innerHTML = `
            <div class="profile-main-content">
                <div class="profile-ref-sheet">
                    <a href="${form.refSheetUrl}" download="${downloadFilename}">
                        <img src="${form.refSheetUrl}" alt="${langDict[form.nameKey]} Reference Sheet">
                    </a>
                </div>
                <div class="profile-info-box">
                    ${basicInfoHTML}
                </div>
            </div>
            <div class="profile-description-area">
                <p class="quote">${quote}</p>
                <hr>
                <h3 data-translate="profile_description">${langDict.profile_description}</h3>
                <p>${description}</p>
                <h3 data-translate="design_notes">${langDict.design_notes}</h3>
                <p>${designNotes}</p>
            </div>
            <div class="profile-actions">
                <div class="tags-container">${tagsHTML}</div>
                <button id="like-btn-${character.id}" class="like-btn" onclick="toggleCharacterLike('${character.id}')"></button>
            </div>
        `;
        
        updateCharacterLikeButton(character.id);
    } catch (error) {
        console.error(`Failed to render form ${formId} for character ${charId}:`, error);
        const container = document.getElementById('character-profile-container');
        if (container) container.innerHTML = `<p>An error occurred. Check the console (F12) for details.</p>`;
    }
}
async function loadMyLikes() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const postsContainer = document.getElementById('liked-posts-container');
    const fanartContainer = document.getElementById('liked-fanart-container');
    const charactersContainer = document.getElementById('liked-characters-container');
    const langDict = translations[currentLang];
    const loadingText = `<p>${langDict.loading_likes}</p>`;
    if(postsContainer) postsContainer.innerHTML = loadingText;
    if(fanartContainer) fanartContainer.innerHTML = loadingText;
    if(charactersContainer) charactersContainer.innerHTML = loadingText;
    const postLikesQuery = await db.collection('likes').where('userId', '==', currentUser.uid).get();
    const likedPostIds = postLikesQuery.docs.map(doc => doc.data().postId);
    const likedPosts = myPosts.filter(post => likedPostIds.includes(post.id));
    const likedFanart = fanartPosts.filter(post => likedPostIds.includes(post.id));
    renderLikedItems(likedPosts, postsContainer, 'post');
    renderLikedItems(likedFanart, fanartContainer, 'post');
    const charLikesQuery = await db.collection('character_likes').where('userId', '==', currentUser.uid).get();
    const likedCharIds = charLikesQuery.docs.map(doc => doc.data().charId);
    const likedCharacters = myCharacters.filter(char => likedCharIds.includes(char.id));
    renderLikedItems(likedCharacters, charactersContainer, 'character');
}
function renderLikedItems(itemsArray, container, itemType) {
    if (!container) return;
    container.innerHTML = '';
    if (itemsArray.length === 0) {
        container.innerHTML = `<p>${translations[currentLang].no_liked_items}</p>`;
        return;
    }
    itemsArray.forEach(item => {
        const langDict = translations[currentLang];
        const title = langDict[item.titleKey] || langDict[item.nameKey];
        const imageUrl = item.iconUrl || (item.type === 'image' ? item.fileUrl : '');
        const link = itemType === 'character' ? `character-profile.html?id=${item.id}` : `post.html?id=${item.id}`;
        const card = document.createElement('a');
        card.href = link;
        card.className = 'liked-item-card';
        card.innerHTML = `<img src="${imageUrl}" alt="${title}"><p>${title}</p>`;
        container.appendChild(card);
    });
}
function filterByTag(tag) {
    window.location.href = `index.html?search=${encodeURIComponent(tag)}`;
}
async function toggleLike(postId) {
    const currentUser = auth.currentUser;
    if (!currentUser) { alert(translations[currentLang].alert_like); return; }
    const likeRef = db.collection('likes').where('postId', '==', postId).where('userId', '==', currentUser.uid);
    const likeQuery = await likeRef.get();
    if (likeQuery.empty) {
        await db.collection('likes').add({ postId: postId, userId: currentUser.uid });
    } else {
        likeQuery.forEach(doc => doc.ref.delete());
    }
    updateLikeButton(postId);
}
async function updateLikeButton(postId) {
    const likeButton = document.getElementById(`like-btn-${postId}`);
    if (!likeButton) return;
    try {
        const likesQuery = await db.collection('likes').where('postId', '==', postId).get();
        const likeCount = likesQuery.size;
        const currentUser = auth.currentUser;
        let userHasLiked = false;
        if (currentUser) {
            const userLikeQuery = await db.collection('likes').where('postId', '==', postId).where('userId', '==', currentUser.uid).get();
            userHasLiked = !userLikeQuery.empty;
        }
        likeButton.innerHTML = `${translations[currentLang].like} (${likeCount})`;
        likeButton.classList.toggle('liked', userHasLiked);
    } catch (error) {
        console.error("Error updating like button for post " + postId + ":", error);
        likeButton.innerHTML = `${translations[currentLang].like} (0)`;
    }
}
async function toggleCharacterLike(charId) {
    const currentUser = auth.currentUser;
    if (!currentUser) { alert(translations[currentLang].alert_like); return; }
    const likeRef = db.collection('character_likes').where('charId', '==', charId).where('userId', '==', currentUser.uid);
    const likeQuery = await likeRef.get();
    if (likeQuery.empty) {
        await db.collection('character_likes').add({ charId: charId, userId: currentUser.uid });
    } else {
        likeQuery.forEach(doc => doc.ref.delete());
    }
    updateCharacterLikeButton(charId);
}
async function updateCharacterLikeButton(charId) {
    const likeButton = document.getElementById(`like-btn-${charId}`);
    if (!likeButton) return;
    try {
        const likesQuery = await db.collection('character_likes').where('charId', '==', charId).get();
        const likeCount = likesQuery.size;
        const currentUser = auth.currentUser;
        let userHasLiked = false;
        if (currentUser) {
            const userLikeQuery = await db.collection('character_likes').where('charId', '==', charId).where('userId', '==', currentUser.uid).get();
            userHasLiked = !userLikeQuery.empty;
        }
        likeButton.innerHTML = `${translations[currentLang].like} (${likeCount})`;
        likeButton.classList.toggle('liked', userHasLiked);
    } catch (error) {
        console.error("Error updating char like button for " + charId + ":", error);
        likeButton.innerHTML = `${translations[currentLang].like} (0)`;
    }
}
async function sharePost(postId) {
    let post = myPosts.find(p => p.id === postId) || fanartPosts.find(p => p.id === postId);
    if (!post) return;
    const shareData = { title: `KennyChris's Art`, text: `Check out this artwork: "${translations[currentLang][post.titleKey]}"`, url: window.location.href };
    if (navigator.share) {
        await navigator.share(shareData).catch(err => console.error('Share failed:', err));
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert(translations[currentLang].alert_link_copied);
    }
}
function copyRSSLink() {
    const rssUrl = window.location.origin + '/feed.xml';
    navigator.clipboard.writeText(rssUrl).then(() => {
        alert(translations[currentLang].alert_rss_copied);
    }).catch(err => {
        console.error('Error al intentar copiar el enlace RSS: ', err);
    });
}
async function loadComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    if (!commentsContainer) return;
    commentsContainer.innerHTML = `<p>${translations[currentLang].loading_comments}</p>`;
    try {
        const commentsQuery = await db.collection('comments').where('postId', '==', postId).orderBy('timestamp', 'asc');
        const querySnapshot = await commentsQuery.get();
        if (querySnapshot.empty) {
            commentsContainer.innerHTML = `<p>${translations[currentLang].no_comments}</p>`;
        } else {
            commentsContainer.innerHTML = '';
            querySnapshot.forEach(doc => {
                const comment = doc.data();
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                const currentUser = auth.currentUser;
                let deleteButton = '';
                if (currentUser && currentUser.uid === adminUID) {
                    deleteButton = `<button class="delete-btn" onclick="deleteComment('${doc.id}', '${postId}')">Delete</button>`;
                }
                const displayName = comment.userDisplayName || 'Anonymous';
                commentElement.innerHTML = `<p><strong>${displayName}:</strong> ${comment.text}</p>${deleteButton}`;
                commentsContainer.appendChild(commentElement);
            });
        }
    } catch (error) {
        console.error("Error loading comments:", error);
        commentsContainer.innerHTML = `<p>${translations[currentLang].error_load_comments}</p>`;
    }
}
function addComment(postId) {
    const currentUser = auth.currentUser;
    if (!currentUser) { alert(translations[currentLang].alert_comment); return; }
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();
    if (commentText === '') { alert(translations[currentLang].alert_comment_empty); return; }
    const displayName = currentUserProfile.username || currentUser.email;
    db.collection('comments').add({
        text: commentText,
        postId: postId,
        userId: currentUser.uid,
        userDisplayName: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        commentInput.value = '';
        loadComments(postId);
    });
}
function deleteComment(commentId, postId) {
    if (!confirm('Are you sure you want to delete this comment forever?')) return;
    db.collection('comments').doc(commentId).delete().then(() => {
        loadComments(postId);
    });
}
async function saveUsername() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const usernameInput = document.getElementById('username-input');
    if (!usernameInput) return;
    const newUsername = usernameInput.value.trim();
    if (newUsername.length < 3) {
        alert(translations[currentLang].alert_username_length);
        return;
    }
    try {
        const usernameQuery = await db.collection('users').where('username', '==', newUsername).get();
        let isTaken = false;
        usernameQuery.forEach(doc => {
            if (doc.id !== currentUser.uid) {
                isTaken = true;
            }
        });
        if (isTaken) {
            alert(translations[currentLang].alert_username_taken);
            return;
        }
        await db.collection('users').doc(currentUser.uid).set({ username: newUsername }, { merge: true });
        alert(translations[currentLang].alert_username_saved);
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${newUsername}`;
        }
    } catch (error) {
        console.error("Error saving username: ", error);
        alert(translations[currentLang].alert_username_error);
    }
}
// --- USER AUTHENTICATION FUNCTIONS ---
function handleAuthError(error) {
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        alert(error.message);
        return;
    }
    if (error.code === 'auth/network-request-failed') {
        errorMessageElement.textContent = translations[currentLang].adblock_warning;
        errorMessageElement.classList.remove('hidden');
    } else {
        errorMessageElement.textContent = error.message;
        errorMessageElement.classList.remove('hidden');
    }
}
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username-signup').value.trim();
    const langDict = translations[currentLang];
    if (!email || !password || !username) {
        alert("Please fill in email, username, and password to sign up.");
        return;
    }
    if (username.length < 3) {
        alert(langDict.alert_username_length);
        return;
    }
    try {
        const usernameQuery = await db.collection('users').where('username', '==', username).get();
        if (!usernameQuery.empty) {
            alert(langDict.alert_username_taken);
            return;
        }
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const newUser = userCredential.user;
        await db.collection('users').doc(newUser.uid).set({ username: username });
        window.location.href = 'index.html';
    } catch (error) {
        handleAuthError(error);
    }
}
function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => { window.location.href = 'index.html'; })
            .catch(handleAuthError);
    }
}
async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        const isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
            window.location.href = 'profile.html?newuser=true';
        } else {
            window.location.href = 'index.html';
        }
    } catch (error) {
        handleAuthError(error);
    }
}
function logOut() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    });
}
// --- MAIN AUTH STATE CONTROLLER ---
auth.onAuthStateChanged(async (user) => {
    const onIndexPage = document.getElementById('post-grid');
    const onLoginPage = document.querySelector('body #auth-container');
    const onProfilePage = document.getElementById('profile-page-container');

    if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        currentUserProfile = userDoc.exists ? userDoc.data() : {};
        const displayName = currentUserProfile.username || user.email;

        if (onLoginPage) {
            window.location.href = 'index.html';
            return;
        }
        if (onIndexPage) {
            const userProfileEl = document.getElementById('user-profile');
            const loginLinkContainer = document.getElementById('login-link-container');
            const welcomeMessage = document.getElementById('welcome-message');
            welcomeMessage.textContent = `Welcome, ${displayName}`;
            userProfileEl.classList.remove('hidden');
            loginLinkContainer.classList.add('hidden');
        }
        if (onProfilePage) {
            document.getElementById('profile-email-display').textContent = user.email;
            document.getElementById('username-input').value = currentUserProfile.username || '';
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('newuser')) {
                document.getElementById('new-user-welcome').classList.remove('hidden');
            }
            loadMyLikes();
        }
    } else {
        if (onProfilePage) {
            alert(translations[currentLang].alert_login_protected);
            window.location.href = 'login.html';
            return;
        }
        if (onIndexPage) {
            document.getElementById('user-profile').classList.add('hidden');
            document.getElementById('login-link-container').classList.remove('hidden');
        }
    }
});
// --- INITIALIZE THE WEBSITE ---
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const handleLanguageToggle = () => {
            const newLang = currentLang === 'en' ? 'es' : 'en';
            setLanguage(newLang);
        };
        langToggle.addEventListener('click', handleLanguageToggle);
        langToggle.addEventListener('touchend', (e) => {
            e.preventDefault(); 
            handleLanguageToggle();
        });
    }
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTag = urlParams.get('search');
        if (searchTag) {
            searchInput.value = searchTag;
            displayPosts(searchTag);
        }
        searchInput.addEventListener('input', () => {
            if (window.history.pushState) {
                const newURL = new URL(window.location.href);
                newURL.searchParams.delete('search');
                window.history.pushState({ path: newURL.href }, '', newURL.href);
            }
            displayPosts(searchInput.value);
        });
    }

    const characterSearchInput = document.getElementById('character-search-input');
    if (characterSearchInput) {
        characterSearchInput.addEventListener('input', () => {
            displayCharacterGallery(characterSearchInput.value);
        });
    }
});
