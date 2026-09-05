/* Aither shared account client.
   Set AITHER_API_URL to your deployed AitherBackend HTTPS URL, or save it in Settings.
*/
(() => {
  const API_KEY = 'aitherApiUrl';
  const getApiUrl = () => (localStorage.getItem(API_KEY) || window.AITHER_API_URL || '').replace(/\/$/, '');
  const request = async (path, options = {}) => {
    const base = getApiUrl();
    if (!base) throw new Error('AitherBackend URL is not configured.');
    const response = await fetch(`${base}${path}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
    });
    let data = {};
    try { data = await response.json(); } catch (_) {}
    if (!response.ok) throw new Error(data.detail || `Request failed (${response.status})`);
    return data;
  };
  const escape = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const toast = message => window.showToast ? window.showToast(message) : alert(message);

  const inject = () => {
    if (document.getElementById('aitherAccountModal')) return;
    const button = document.createElement('button');
    button.id = 'accountBtn'; button.className = 'pill'; button.textContent = 'Account';
    document.querySelector('.top-actions')?.insertBefore(button, document.getElementById('settingsBtn'));
    const modal = document.createElement('div'); modal.id = 'aitherAccountModal'; modal.className = 'modal hidden';
    modal.innerHTML = `<div class="modal-card"><div class="modal-head"><h2>Aither Account</h2><button id="aitherClose" class="icon-btn">×</button></div><div id="aitherAccountBody"><p>Checking your Aither account…</p></div><div class="aither-auth-config"><label class="setting"><span>AitherBackend URL</span><input id="aitherApiUrl" class="convert-input" type="url" placeholder="https://your-aither-backend.example"></label><button id="aitherSaveUrl" class="setting-button secondary">Save backend URL</button></div></div>`;
    document.body.appendChild(modal);
    button.onclick = () => { modal.classList.remove('hidden'); refresh(); };
    document.getElementById('aitherClose').onclick = () => modal.classList.add('hidden');
    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
    document.getElementById('aitherApiUrl').value = getApiUrl();
    document.getElementById('aitherSaveUrl').onclick = async () => { const url = document.getElementById('aitherApiUrl').value.trim().replace(/\/$/, ''); if (url && !/^https?:\/\//i.test(url)) return toast('Use an HTTPS backend URL.'); if (url) localStorage.setItem(API_KEY, url); else localStorage.removeItem(API_KEY); toast(url ? 'AitherBackend saved' : 'Backend URL cleared'); refresh(); };
  };

  const refresh = async () => {
    const body = document.getElementById('aitherAccountBody'); if (!body) return;
    document.getElementById('aitherApiUrl').value = getApiUrl();
    if (!getApiUrl()) { body.innerHTML = '<p>Connect this app to your deployed AitherBackend to use one shared Aither account across your apps.</p>'; return; }
    try {
      const data = await request('/api/auth/session');
      if (data.authenticated) {
        body.innerHTML = `<div class="aither-user"><strong>${escape(data.user.name)}</strong><span>${escape(data.user.email)}</span></div><button id="aitherLogout" class="setting-button">Log out</button>`;
        document.getElementById('aitherLogout').onclick = async () => { try { await request('/api/auth/logout', { method:'POST', body:'{}' }); toast('Signed out'); refresh(); } catch (e) { toast(e.message); } };
      } else showForm('login');
    } catch (e) { body.innerHTML = `<p>Could not connect to AitherBackend.</p><small>${escape(e.message)}</small>`; }
  };

  const showForm = mode => {
    const register = mode === 'register';
    document.getElementById('aitherAccountBody').innerHTML = `<form id="aitherAuthForm"><label class="setting"><span>${register ? 'Name' : 'Email'}</span><input id="aitherField1" class="convert-input" required ${register ? 'maxlength="80"' : 'type="email"'}></label>${register ? '<label class="setting"><span>Email</span><input id="aitherEmail" class="convert-input" type="email" required></label>' : ''}<label class="setting"><span>Password</span><input id="aitherPassword" class="convert-input" type="password" minlength="8" required></label><button class="setting-button" type="submit">${register ? 'Create Aither Account' : 'Log in'}</button></form><button id="aitherSwitch" class="text-btn">${register ? 'Already have an account? Log in' : 'Create a new Aither account'}</button>`;
    document.getElementById('aitherSwitch').onclick = () => showForm(register ? 'login' : 'register');
    document.getElementById('aitherAuthForm').onsubmit = async e => {
      e.preventDefault();
      const payload = register ? { name: document.getElementById('aitherField1').value.trim(), email: document.getElementById('aitherEmail').value.trim(), password: document.getElementById('aitherPassword').value } : { email: document.getElementById('aitherField1').value.trim(), password: document.getElementById('aitherPassword').value };
      try { await request(register ? '/api/auth/register' : '/api/auth/login', { method:'POST', body: JSON.stringify(payload) }); toast(register ? 'Aither account created' : 'Welcome back'); refresh(); } catch (err) { toast(err.message); }
    };
  };
  window.AitherAuth = { getApiUrl, request, refresh };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();
