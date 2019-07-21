import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFire,
  faUser,
  faHeart as fasHeart,
  faStar as fasStar
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

library.add(faFire, faUser, fasHeart, farHeart, fasStar, farStar);

export default library;
