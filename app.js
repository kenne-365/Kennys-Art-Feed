// --- GLOBAL VARIABLES ---
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
            specificInfo: { fullName: "char_kenny_fullName", species: "char_kenny_species", age: "char_kenny_age", gender: "char_kenny_gender", pronouns: "char_kenny_pronouns", height: "char_kenny_height" }
        }]
    },
    {
        id: "lane", nameKey: "char_name_lane", iconUrl: "characters/icons/lane_icon.gif",
        tags: ["Shapeshifter", "Furry", "Fursona"],
        baseInfo: { sexuality: "char_lane_sexuality", status: "char_lane_status", build: "char_lane_build", occupation: "char_lane_occupation", language: "char_lane_language", disorders: "char_lane_disorders" },
        forms: [
            { formId: "main", nameKey: "char_name_lane", refSheetUrl: "characters/lane_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lane_designNotes", specificInfo: { fullName: "char_lane_fullName", nickname: "char_lane_nickname", species: "char_lane_species", age: "char_lane_age", gender: "char_lane_gender", pronouns: "char_lane_pronouns", height: "char_lane_height" } },
            { formId: "lynn", nameKey: "char_lynn_nickname", refSheetUrl: "characters/lynn_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lynn_designNotes", specificInfo: { nickname: "char_lynn_nickname" } },
            { formId: "lex", nameKey: "char_lex_nickname", refSheetUrl: "characters/lex_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lex_designNotes", specificInfo: { nickname: "char_lex_nickname" } },
            { formId: "lee", nameKey: "char_lee_nickname", refSheetUrl: "characters/lee_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_lee_designNotes", specificInfo: { nickname: "char_lee_nickname" } },
            { formId: "loren", nameKey: "char_loren_nickname", refSheetUrl: "characters/loren_ref.png", quoteKey: "char_lane_quote", descriptionKey: "char_lane_description", designNotesKey: "char_loren_designNotes", specificInfo: { nickname: "char_loren_nickname" } }
        ]
    },
    {
        id: "fido", nameKey: "char_name_fido", iconUrl: "characters/icons/fido_icon.png",
        tags: ["IDog", "Furry", "OC"],
        baseInfo: { sexuality: "char_fido_sexuality", status: "char_fido_status", occupation: "char_fido_occupation", language: "char_fido_language", disorders: "char_fido_disorders" },
        forms: [{
            formId: "main", nameKey: "char_name_fido", refSheetUrl: "characters/fido_ref.png",
            quoteKey: "char_fido_quote", descriptionKey: "char_fido_description", designNotesKey: "char_fido_designNotes",
            specificInfo: { fullName: "char_fido_fullName", species: "char_fido_species", age: "char_fido_age", gender: "char_fido_gender", pronouns: "char_fido_pronouns", height: "char_fido_height" }
        }]
    },
];

// --- LocalStorage keys & client id ---
const LS_KEYS = {
    LIKES: 'kaf_likes',
    USER_LIKES: 'kaf_user_likes',
    CHAR_LIKES: 'kaf_char_likes',
    USER_CHAR_LIKES: 'kaf_user_char_likes',
    COMMENTS: 'kaf_comments',
    USERNAME: 'kaf_username',
    CLIENT_ID: 'kaf_client_id'
};

function getClientId() {
    let id = localStorage.getItem(LS_KEYS.CLIENT_ID);
    if (!id) {
        id = 'c_' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(LS_KEYS.CLIENT_ID, id);
    }
    return id;
}
function getUsername() {
    return localStorage.getItem(LS_KEYS.USERNAME) || 'Anonymous';
}
function setUsername(name) {
    if (typeof name === 'string') {
        localStorage.setItem(LS_KEYS.USERNAME, name.trim());
    }
}

// --- TRANSLATION FUNCTION (unchanged, just keep using it) ---
function setLanguage(lang) {
    if (!translations || !translations[lang]) return;
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

// --- HELPERS FOR LOCALSTORAGE DATA ---
function _getLikesMap() {
    return JSON.parse(localStorage.getItem(LS_KEYS.LIKES) || '{}');
}
function _saveLikesMap(map) {
    localStorage.setItem(LS_KEYS.LIKES, JSON.stringify(map));
}
function _getUserLikes() {
    return JSON.parse(localStorage.getItem(LS_KEYS.USER_LIKES) || '{}');
}
function _saveUserLikes(obj) {
    localStorage.setItem(LS_KEYS.USER_LIKES, JSON.stringify(obj));
}
function _getCharLikesMap() {
    return JSON.parse(localStorage.getItem(LS_KEYS.CHAR_LIKES) || '{}');
}
function _saveCharLikesMap(map) {
    localStorage.setItem(LS_KEYS.CHAR_LIKES, JSON.stringify(map));
}
function _getUserCharLikes() {
    return JSON.parse(localStorage.getItem(LS_KEYS.USER_CHAR_LIKES) || '{}');
}
function _saveUserCharLikes(obj) {
    localStorage.setItem(LS_KEYS.USER_CHAR_LIKES, JSON.stringify(obj));
}
function _getCommentsMap() {
    return JSON.parse(localStorage.getItem(LS_KEYS.COMMENTS) || '{}');
}
function _saveCommentsMap(map) {
    localStorage.setItem(LS_KEYS.COMMENTS, JSON.stringify(map));
}
function generateId(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
}
function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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
    if (!contentArray || contentArray.length === 0) {
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
            mediaElement = `<img src="${post.fileUrl}" alt="${escapeHtml(postTitle)}">`;
        } else {
            mediaElement = `<video controls muted loop playsinline src="${post.fileUrl}"></video>`;
        }

        const tagsHTML = post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('');
        postElement.innerHTML = `
            ${mediaElement}
            <div class="post-info"><button class="post-title-button" onclick="goToPost('${post.id}')"><h3>${escapeHtml(postTitle)}</h3></button><p>${escapeHtml(postDesc)}</p></div>
            <div class="tags-container">${tagsHTML}</div>
            <div class="post-actions">
                <button id="like-btn-${post.id}" class="like-btn" onclick="toggleLike('${post.id}')"></button>
                <button onclick="sharePost('${post.id}')">${langDict.share}</button>
            </div>
            <div class="comments-section">
                <h4 data-translate="comments">${langDict.comments}</h4>
                <div class="comments-container" id="comments-${post.id}"></div>
                <div class="add-comment-form">
                    <textarea id="comment-input-${post.id}" placeholder="${langDict.comment_placeholder || ''}"></textarea>
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
        mediaElement = `<img src="${post.fileUrl}" alt="${escapeHtml(postTitle)}">`;
    } else {
        mediaElement = `<video controls muted loop playsinline src="${post.fileUrl}"></video>`;
    }

    const tagsHTML = post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('');
    postElement.innerHTML = `
        ${mediaElement}
        <div class="post-info"><h3>${escapeHtml(postTitle)}</h3><p>${escapeHtml(postDesc)}</p></div>
        <div class="tags-container">${tagsHTML}</div>
        <div class="post-actions">
            <button id="like-btn-${post.id}" class="like-btn" onclick="toggleLike('${post.id}')"></button>
            <button onclick="sharePost('${post.id}')">${langDict.share}</button>
        </div>
        <div class="comments-section">
            <h4 data-translate="comments">${langDict.comments}</h4>
            <div class="comments-container" id="comments-${post.id}"></div>
            <div class="add-comment-form">
                <textarea id="comment-input-${post.id}" placeholder="${langDict.comment_placeholder || ''}"></textarea>
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
            <img src="${char.iconUrl}" alt="${escapeHtml(charName)}">
            <h4>${escapeHtml(charName)}</h4>
            <div class="tags-container">${tagsHTML}</div>
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
        const downloadFilename = `${character.id}_${form.formId}_ref.png`;

        container.innerHTML = `
            <div class="profile-main-content">
                <div class="profile-ref-sheet">
                    <a href="${form.refSheetUrl}" download="${downloadFilename}">
                        <img src="${form.refSheetUrl}" alt="${escapeHtml(langDict[form.nameKey])} Reference Sheet">
                    </a>
                </div>
                <div class="profile-info-box">
                    ${basicInfoHTML}
                </div>
            </div>
            <div class="profile-description-area">
                <p class="quote">${escapeHtml(quote)}</p>
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

// --- LIKES: No account required ---
function toggleLike(postId) {
    let userLikes = _getUserLikes();
    let likesMap = _getLikesMap();
    if (userLikes[postId]) {
        delete userLikes[postId];
        likesMap[postId] = Math.max((likesMap[postId] || 1) - 1, 0);
    } else {
        userLikes[postId] = true;
        likesMap[postId] = (likesMap[postId] || 0) + 1;
    }
    _saveUserLikes(userLikes);
    _saveLikesMap(likesMap);
    updateLikeButton(postId);
}
function updateLikeButton(postId) {
    const likeButton = document.getElementById(`like-btn-${postId}`);
    if (!likeButton) return;
    const likesMap = _getLikesMap();
    const userLikes = _getUserLikes();
    const likeCount = likesMap[postId] || 0;
    const userHasLiked = !!userLikes[postId];
    likeButton.innerHTML = `${translations[currentLang].like || 'Like'} (${likeCount})`;
    likeButton.classList.toggle('liked', userHasLiked);
}

// --- CHARACTER LIKES: No account required ---
function toggleCharacterLike(charId) {
    let userCharLikes = _getUserCharLikes();
    let charLikesMap = _getCharLikesMap();
    if (userCharLikes[charId]) {
        delete userCharLikes[charId];
        charLikesMap[charId] = Math.max((charLikesMap[charId] || 1) - 1, 0);
    } else {
        userCharLikes[charId] = true;
        charLikesMap[charId] = (charLikesMap[charId] || 0) + 1;
    }
    _saveUserCharLikes(userCharLikes);
    _saveCharLikesMap(charLikesMap);
    updateCharacterLikeButton(charId);
}
function updateCharacterLikeButton(charId) {
    const likeButton = document.getElementById(`like-btn-${charId}`);
    if (!likeButton) return;
    const charLikesMap = _getCharLikesMap();
    const userCharLikes = _getUserCharLikes();
    const likeCount = charLikesMap[charId] || 0;
    const userHasLiked = !!userCharLikes[charId];
    likeButton.innerHTML = `${translations[currentLang].like || 'Like'} (${likeCount})`;
    likeButton.classList.toggle('liked', userHasLiked);
}

// --- COMMENTS: No account required, uses device ID and optional display name ---
function loadComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    if (!commentsContainer) return;
    const commentsMap = _getCommentsMap();
    const comments = commentsMap[postId] || [];
    if (comments.length === 0) {
        commentsContainer.innerHTML = `<p>${translations[currentLang].no_comments}</p>`;
        return;
    }
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        let deleteButton = '';
        if (comment.clientId === getClientId()) {
            deleteButton = `<button class="delete-btn" onclick="deleteComment('${comment.id}', '${postId}')">Delete</button>`;
        }
        const displayName = comment.name || 'Anonymous';
        commentElement.innerHTML = `<p><strong>${escapeHtml(displayName)}:</strong> ${escapeHtml(comment.text)}</p>${deleteButton}`;
        commentsContainer.appendChild(commentElement);
    });
}
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();
    if (commentText === '') {
        alert(translations[currentLang].alert_comment_empty || "Comment cannot be empty!");
        return;
    }
    const commentsMap = _getCommentsMap();
    const newComment = {
        id: generateId('comment'),
        name: getUsername(),
        text: commentText,
        timestamp: Date.now(),
        clientId: getClientId()
    };
    commentsMap[postId] = commentsMap[postId] || [];
    commentsMap[postId].push(newComment);
    _saveCommentsMap(commentsMap);
    commentInput.value = '';
    loadComments(postId);
}
function deleteComment(commentId, postId) {
    const commentsMap = _getCommentsMap();
    commentsMap[postId] = (commentsMap[postId] || []).filter(c => c.id !== commentId);
    _saveCommentsMap(commentsMap);
    loadComments(postId);
}

// --- USERNAME (display name, optional, local only) ---
function saveUsername() {
    const usernameInput = document.getElementById('username-input');
    if (!usernameInput) return;
    const newUsername = usernameInput.value.trim();
    if (newUsername.length < 3) {
        alert(translations[currentLang].alert_username_length || "Username must be at least 3 characters.");
        return;
    }
    setUsername(newUsername);
    alert(translations[currentLang].alert_username_saved || "Username saved!");
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${newUsername}`;
    }
}

// --- MAIN UI CONTROLLER ---
function updateUIOnLoad() {
    const username = getUsername();
    const onIndexPage = document.getElementById('post-grid');
    if (onIndexPage) {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${username}`;
        }
    }
    // Optionally show/hide username setting UI
}

// --- SHARE POST ---
function sharePost(postId) {
    let post = myPosts.find(p => p.id === postId) || fanartPosts.find(p => p.id === postId);
    if (!post) return;
    const url = window.location.href;
    const shareData = { title: `KennyChris's Art`, text: `Check out: "${translations[currentLang][post.titleKey]}"`, url };
    if (navigator.share) {
        navigator.share(shareData).catch(err => console.error('Share failed:', err));
    } else {
        navigator.clipboard.writeText(url);
        alert(translations[currentLang].alert_link_copied || "Link copied!");
    }
}
function copyRSSLink() {
    const rssUrl = window.location.origin + '/feed.xml';
    navigator.clipboard.writeText(rssUrl).then(() => {
        alert(translations[currentLang].alert_rss_copied || "RSS link copied!");
    }).catch(err => {
        console.error('Error copying RSS link:', err);
    });
}
function filterByTag(tag) {
    window.location.href = `index.html?search=${encodeURIComponent(tag)}`;
}

// --- INITIALIZE THE WEBSITE ---
document.addEventListener('DOMContentLoaded', () => {
    // Language toggle
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

    // Search
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

    // Character search
    const characterSearchInput = document.getElementById('character-search-input');
    if (characterSearchInput) {
        characterSearchInput.addEventListener('input', () => {
            displayCharacterGallery(characterSearchInput.value);
        });
    }

    // Username set
    const usernameInput = document.getElementById('username-input');
    const usernameBtn = document.getElementById('username-btn');
    if (usernameInput && usernameBtn) {
        usernameInput.value = getUsername();
        usernameBtn.addEventListener('click', saveUsername);
    }

    updateUIOnLoad();
});
