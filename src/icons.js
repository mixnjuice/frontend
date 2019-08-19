import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFire,
  faUser,
  faHeart as fasHeart,
  faStar as fasStar,
  faCheck,
  faTimesCircle,
  faMinusCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faStar as farStar,
  faCheckSquare,
  faSquare
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faFire,
  faUser,
  faCheck,
  faTimesCircle,
  faMinusCircle,
  faCheckCircle,
  fasHeart,
  farHeart,
  fasStar,
  farStar,
  faCheckSquare,
  faSquare
);

export default library;
