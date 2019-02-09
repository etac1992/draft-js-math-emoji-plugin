import React from 'react';
import FaSmileO from 'react-icons/lib/fa/smile-o';
import FaPaw from 'react-icons/lib/fa/paw';
import FaCutlery from 'react-icons/lib/fa/cutlery';
import FaFutbolO from 'react-icons/lib/fa/futbol-o';

const defaultEmojiGroups = [{
  title: 'The Greek Alphabet',
  icon: (
    <FaSmileO style={{ verticalAlign: '' }} />
  ),
  categories: ['greek'],
}, {
  title: 'Factor Prefixes',
  icon: (
    <FaPaw style={{ verticalAlign: '' }} />
  ),
  categories: ['greek'],
}, {
  title: 'Constants',
  icon: (
    <FaCutlery style={{ verticalAlign: '' }} />
  ),
  categories: ['greek'],
}, {
  title: 'Formulae',
  icon: (
    <FaFutbolO style={{ verticalAlign: '' }} />
  ),
  categories: ['greek'],
}];

export default defaultEmojiGroups;
