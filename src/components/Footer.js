import React from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Instagram from "../assets/icons/instagram.png";
import Twitter from "../assets/icons/twitter.png";
import YouTube from "../assets/icons/youtube.png";
import Reddit from "../assets/icons/reddit.png";

const Footer = () => {
  const icons = [
    {
      src : Instagram,
      href: "",
      alt:"Instagram",
    },
    {
      src : Twitter,
      href: "https://twitter.com/IndexxFinance",
      alt:"Twitter",
    },
    {
      src : YouTube,
      href: "",
      alt:"You-tube",
    },
    {
      src : Reddit,
      href: "",
      alt:"Reddit",
    },
  ]


  return (
      <footer className="site-footer">
        <div className="container">
          <div className="footer-flex">
            <div className="col-xs-6 col-md-4 footercentre">
              <a href="/" id="1067941554">
                <img src="https://lirp.cdn-website.com/5afbaf73/dms3rep/multi/opt/index-38-238w.png"
                     width="50%" height="22%" alt=""/>
              </a>
              <br/><br/><br/>
              <p>
                Indexx stock token is the world first coin <br/>
                pegged with world largest stock market <br/>
                index the S&P 500. Pioneered the concept in <br/>
                the cryptocurrency space.
              </p>
            </div>
            <div className="col-xs-6 col-md-4 footercentre2">
              <h6>
                Indexx
              </h6>
              <p>
                949-228-9079
                <br/> <br/> <br/>

                indexx Limited, CUB Financial Centre,<br/>
                GF6, Lyford Cay, Nassau, Bahamas.<br/> <br/> <br/>

                550 Newport Center Drive<br/>
                Newport Beach,<br/>
                CA 92660 United State<br/>
                <br/>
              </p>
              <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by &nbsp;
                <a href="https://www.indexx.ai/">Indexx</a>.
              </p>
              <br/>

              <div className="social-wrapper">
                <ul>
                  { icons.map( icon => (
                      <li>
                        <a href={icon.href} target="_blank" rel="noopener noreferrer">
                          <img className="social-connect-icons" src={icon.src} alt={icon.alt}/></a>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xs-6 col-md-4 footercentre2">
              <h6>Links</h6>

              <Navigation
                  activeItemId="/management/members"
                  onSelect={({itemId}) => {
                    if (itemId !== "1" && itemId !== "2") {
                      window.location.href = itemId;
                    }
                  }}
                  items={[

                    {
                      title: 'Indexx Tokens',
                      itemId: '1',
                      subNav: [
                        {
                          title: 'Indexx500',
                          itemId: 'https://www.indexx.ai/services',
                        },
                        {
                          title: 'Indexx Crypto',
                          itemId: 'https://www.indexx.ai/crypto-50',
                        },
                        {
                          title: 'Indexx Insure',
                          itemId: 'https://www.indexx.ai/indexx-insure',
                        },
                        {
                          title: 'Indexx USD+',
                          itemId: 'https://www.indexx.ai/indexx-usd',
                        },
                        {
                          title: 'NFTs',
                          itemId: 'https://www.indexx.ai/nft',
                        },
                      ],
                    },
                    {
                      title: 'About',
                      itemId: '2',
                      subNav: [
                        {
                          title: 'About Indexx',
                          itemId: 'https://www.indexx.ai/about-indexx',
                        },
                        {
                          title: 'How It Works',
                          itemId: 'https://www.indexx.ai/team',
                        },
                        {
                          title: 'Transparency',
                          itemId: 'https://www.indexx.ai/transparency',
                        }
                      ],
                    },
                    {
                      title: 'PRE-ICO',
                      itemId: 'https://www.indexx.ai/pre-ico-indexx500',

                    },
                  ]}
              />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
