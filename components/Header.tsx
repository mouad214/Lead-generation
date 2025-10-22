
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md rounded-xl p-6 md:p-8 text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
        LeadGen-Quinetra
      </h1>
      <p className="mt-2 text-md md:text-lg text-slate-600 max-w-2xl mx-auto">
        تطبيق توليد وإدارة العملاء المحتملين للمشاريع المحلية في القنيطرة. اجمع البيانات، قم بتأهيلها، وأرسلها مباشرة إلى نظامك.
      </p>
    </header>
  );
};

export default Header;
