import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    { label: 'MOUSE', path: '/mouse' },
    { label: 'TECLADO', path: '/teclado' },
    { label: 'MONITOR', path: '/monitor' }
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleNavigate(path: string) {
    setIsOpen(false);
    navigate(path); 
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >CATEGORIAS</button>

      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <ul className="py-1 text-gray-700">
            {options.map((option) => (
              <li
                key={option.label}
                onClick={() => handleNavigate(option.path)}
                className="block px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
