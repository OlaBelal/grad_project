import "@fortawesome/fontawesome-free/css/all.min.css";
import footerImage from "../assets/images/Footerimg.png";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // أضف هذا الاستيراد

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`flex flex-col relative ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Footer */}
      <footer className={`text-center text-lg-start bg-transparent ${i18n.language === 'ar' ? 'pr-20' : 'pl-20'}`}>
        <div className="container p-4">
          <div className="row flex justify-between gap-8">
            {/* Travel Section */}
          <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4">
  <h5 className="text-uppercase text-black text-2xl mb-4">{t('footer.travel')}</h5>
  <p className="text-base text-[#4a4a4a] mb-4">
    {t('footer.travelDescription')}
  </p>
  <div className="flex flex-col items-center"> {/* تغيير هنا */}
    <div className="flex gap-4 mt-4"> {/* تغيير هنا */}
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
        <i className="fab fa-twitter fa-lg"></i>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
        <i className="fab fa-facebook-f fa-lg"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
        <i className="fab fa-instagram fa-lg"></i>
      </a>
      <a href="https://wa.me/+201091640114" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
        <i className="fab fa-whatsapp fa-lg"></i>
      </a>
    </div>
  </div>
</div>

            {/* Company Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4">
              <h5 className="text-uppercase text-black text-2xl mb-4">{t('footer.company')}</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/companies" className="text-dark no-underline text-base" aria-label={t('footer.ourPartners')}>
                    {t('footer.ourPartners')}
                  </a>
                </li>
                <li>
                  <a href="/travels" className="text-dark no-underline text-base" aria-label={t('footer.travels')}>
                    {t('footer.travels')}
                  </a>
                </li>
                <li>
                  <a href="/events" className="text-dark no-underline text-base" aria-label={t('footer.events')}>
                    {t('footer.events')}
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="text-dark no-underline text-base" aria-label={t('footer.aboutUs')}>
                    {t('footer.aboutUs')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4">
              <h5 className="text-uppercase text-black text-2xl mb-4">{t('footer.newsletter')}</h5>
              <p className="text-sm text-[#6c757d] mt-2">
                {t('footer.newsletterDescription')}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-black text-lg whitespace-nowrap">{t('footer.becomePartner')}</span>
              <Link
  to="/GetInTouch"
  className="bg-[#DF6951] hover:bg-[#c75a45] text-white px-4 py-2 rounded-md text-sm whitespace-nowrap relative z-10"
>
  {t('footer.getInTouch')}
</Link>

              </div>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4">
              <h5 className="text-uppercase text-black text-2xl mb-4">{t('footer.contact')}</h5>
              <p className="text-base">
                <i className={`fas fa-envelope text-[#DF6951] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t('footer.email')}: <a href="mailto:info@travelwebsite.com" className="text-dark">info@travelwebsite.com</a>
                <br />
                <i className={`fas fa-phone text-[#DF6951] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t('footer.phone')}: <a href="tel:+201091640114" className="text-dark">+20 1091640114</a>
              </p>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="container px-4">
          <hr className="border-t border-black my-0" />
        </div>

        {/* Footer Bottom */}
        <div className="text-center p-3 bg-transparent px-8 text-base">
          © 2025 {t('footer.copyright')}
        </div>
      </footer>

      {/* Image */}
      <div className={`absolute bottom-0 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} w-[577px] h-[300px] overflow-hidden z-0`}>
        <img
          src={footerImage}
          alt={t('footer.footerImageAlt')}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;