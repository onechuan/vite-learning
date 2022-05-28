import SvgIcon from '../svg-icon';
import './index.scss';

const logos = import.meta.globEager('@/assets/svg/logo-*.svg');
const iconUrls = Object.values(logos).map((mod) => {
  // 如 ../../assets/icons/logo-1.svg -> logo-1
  const fileName = mod.default.split('/').pop();
  const [svgName] = fileName.split('.');
  return svgName;
});

export function Header() {
  return (
    <>
      {iconUrls.map((item) => (
        <SvgIcon
          name={item}
          key={item}
          width="50"
          height="50"
          prefix={''}
          color={''}
        />
      ))}
      <p className="header">This is Header</p>
    </>
  );
}
