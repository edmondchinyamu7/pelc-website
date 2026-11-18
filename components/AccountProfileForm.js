'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AccountProfileForm({ userId, userEmail, initialProfile }) {
  const [hasProfile, setHasProfile] = useState(Boolean(initialProfile));
  const [fullName, setFullName] = useState(initialProfile?.full_name ?? '');
  const [companyName, setCompanyName] = useState(initialProfile?.company_name ?? '');
  const [phone, setPhone] = useState(initialProfile?.phone ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    if (!supabase) {
      setError('Account service is not configured yet.');
      setIsSaving(false);
      return;
    }

    const payload = {
      full_name: fullName.trim() || null,
      company_name: companyName.trim() || null,
      phone: phone.trim() || null,
    };

    const { error: saveError } = hasProfile
      ? await supabase.from('profiles').update(payload).eq('id', userId)
      : await supabase.from('profiles').insert({
          id: userId,
          email: userEmail ?? null,
          ...payload,
        });

    if (saveError) {
      setError('Could not save profile changes. Please try again.');
      setIsSaving(false);
      return;
    }

    setHasProfile(true);
    setSaved(true);
    setIsSaving(false);
  };

  return (
    <form className="pelc-auth__form" onSubmit={handleSave} style={{ marginBottom: '12px' }}>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="profile-full-name">Full name</label>
        <input
          id="profile-full-name"
          className="pelc-auth__input"
          type="text"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="profile-company">Company / Organization</label>
        <input
          id="profile-company"
          className="pelc-auth__input"
          type="text"
          placeholder="Optional"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="profile-phone">Phone / WhatsApp</label>
        <input
          id="profile-phone"
          className="pelc-auth__input"
          type="tel"
          placeholder="Optional"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {error && <p className="pelc-auth__error" role="alert">{error}</p>}
      {saved && <p className="pelc-auth__success" role="status">Profile updated.</p>}
      <button type="submit" className="pelc-auth__button" disabled={isSaving}>
        {isSaving ? 'Saving…' : 'Save profile'}
      </button>
    </form>
  );
}
