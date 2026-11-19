'use client';

import { useState } from 'react';
import { Building2, CheckCircle2, LoaderCircle, Phone, Save, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AccountProfileForm({ userId, userEmail, initialProfile }) {
  const [hasProfile, setHasProfile] = useState(Boolean(initialProfile));
  const [fullName, setFullName] = useState(initialProfile?.full_name ?? '');
  const [companyName, setCompanyName] = useState(initialProfile?.company_name ?? '');
  const [phone, setPhone] = useState(initialProfile?.phone ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();
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
    <form className="np-profile-form" onSubmit={handleSave} style={{ marginBottom: '12px' }}>
      <div className="np-profile-field">
        <label htmlFor="profile-full-name">Full Name</label>
        <div className="np-profile-input-wrap">
          <UserRound size={17} aria-hidden="true" />
          <input
            id="profile-full-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
      </div>
      <div className="np-profile-field">
        <label htmlFor="profile-company">Company / Organization</label>
        <div className="np-profile-input-wrap">
          <Building2 size={17} aria-hidden="true" />
          <input
            id="profile-company"
            type="text"
            autoComplete="organization"
            placeholder="Your company or organization (optional)"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>
      </div>
      <div className="np-profile-field">
        <label htmlFor="profile-phone">Phone / WhatsApp</label>
        <div className="np-profile-input-wrap">
          <Phone size={17} aria-hidden="true" />
          <input
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number (optional)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>
      {error ? <p className="np-profile-message np-profile-message--error" role="alert">{error}</p> : null}
      {saved ? <p className="np-profile-message np-profile-message--success" role="status"><CheckCircle2 size={15} /> Profile updated successfully.</p> : null}
      <button type="submit" className="np-profile-save" disabled={isSaving}>
        {isSaving ? <LoaderCircle size={17} className="np-profile-spinner" /> : <Save size={17} />}
        {isSaving ? 'Saving profile…' : 'Save Profile'}
      </button>
    </form>
  );
}
