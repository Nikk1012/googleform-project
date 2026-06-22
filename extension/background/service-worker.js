// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.includes('docs.google.com/forms')
  ) {
    // Notify that we're on a Google Forms page
    chrome.storage.local.set({ onFormsPage: true });
  } else if (changeInfo.status === 'complete') {
    chrome.storage.local.set({ onFormsPage: false });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveToBackend') {
    const { result, token } = request;

    fetch('https://googleform-project.onrender.com/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(result),
    })
      .then((res) => res.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => sendResponse({ success: false, error: err.message }));

    return true;
  }
});