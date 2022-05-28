import { Footer } from './components/footer';
import { Header } from './components/header';

import logoSrc from '@/assets/svg/logo.svg';
import { ReactComponent as ReactLogo } from '@/assets/svg/logo.svg';

function App() {
  return (
    <div>
      <img src={logoSrc} />
      <Header />
      <Footer />
      <ReactLogo />
    </div>
  );
}

export default App;
