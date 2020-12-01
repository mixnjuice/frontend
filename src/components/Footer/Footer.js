import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-4 py-2 page-footer text-right border-top">
      <small>
        Copyright &copy; {new Date().getFullYear()} mixnjuice.com. Recipes are
        property of their respective creators.
      </small>
    </footer>
  );
}
