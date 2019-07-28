import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFire,
  faUser,
  faHeart as fasHeart,
  faStar as fasStar,
  faCheck,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faFire,
  faUser,
  faCheck,
  faTimesCircle,
  fasHeart,
  farHeart,
  fasStar,
  farStar
);

export default library;
