import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';
import { FaICursor } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';

const logicBlockList = [
  {
    id: 1,
    title: 'সামনে যাও',
    name: 'move_forward',
    color: '#00D180',
    icon: FaArrowUp,
  },
  {
    id: 2,
    title: 'পেছনে যাও ',
    name: 'move_backward',
    color: '#08B7A8',

    icon: FaArrowDown,
  },
  {
    id: 3,
    title: 'ডানে ঘুরো ',
    name: 'move_right',
    color: '#1D75BD',

    icon: FaArrowRight,
  },
  {
    id: 4,
    title: 'বামে ঘুরো ',
    name: 'move_left',
    color: '#272262',

    icon: FaArrowLeft,
  },
  {
    id: 5,
    title: 'থামো',
    name: 'stop',
    color: '#92278F',

    icon: FaStop,
  },
  {
    id: 6,
    title: 'লাইন ফলো করো',
    name: 'line_follow',
    color: '#662E91',

    icon: FaICursor,
  },
];

export default logicBlockList;
