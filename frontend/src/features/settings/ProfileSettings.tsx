import { useState } from "react";
import type { FormEvent } from "react";

import {
  UserRound,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import type { UserProfile } from "../../types/user";

interface ProfileSettingsProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export default function ProfileSettings({
  profile,
  onSave,
}: ProfileSettingsProps) {

  // Form state
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Generate profile initials
  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
      .toUpperCase();

  // Check whether information has changed
  const hasChanges =
    firstName !== profile.firstName ||
    lastName !== profile.lastName ||
    email !== profile.email;

  // Save profile
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    onSave(updatedProfile);

    setFirstName(updatedProfile.firstName);
    setLastName(updatedProfile.lastName);
    setEmail(updatedProfile.email);

    setSuccess("Profile updated successfully.");
  }

  // Reset unsaved changes
  function handleCancel() {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);

    setError("");
    setSuccess("");
  }

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <UserRound size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Personal Information
          </h2>

          <p className="text-muted text-sm mt-1">
            Manage your personal profile details.
          </p>
        </div>

      </div>

      {/* Profile Avatar */}
      <div className="flex items-center gap-4 py-6 mt-4 border-y border-border">

        <div className="w-20 h-20 bg-blue-100 text-primary rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
          {initials}
        </div>

        <div className="min-w-0">

          <h3 className="text-xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h3>

          <p className="text-muted text-sm mt-1 break-all">
            {profile.email}
          </p>

          <p className="text-muted text-xs mt-2">
            Personal account
          </p>

        </div>

      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        onChange={() => {
          setSuccess("");
          setError("");
        }}
        className="mt-6 space-y-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              maxLength={50}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              maxLength={50}
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium mb-2"
            >
              Country
            </label>

            <input
              id="country"
              type="text"
              value={profile.country}
              readOnly
              className={`${inputClass} bg-slate-50 text-muted`}
            />

            <p className="text-xs text-muted mt-2">
              SpendWise currently targets Canadian users.
            </p>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm"
          >
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            role="status"
            className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm"
          >
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">

          <button
            type="button"
            onClick={handleCancel}
            disabled={!hasChanges}
            className="px-5 py-3 border border-border rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!hasChanges}
            className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}