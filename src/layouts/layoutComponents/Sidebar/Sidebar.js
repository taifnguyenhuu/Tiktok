/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Sidebar.module.scss';
import Navigation from './Navigation';
import SuggestedAccount, { FollowingAccount } from './SuggestedAccount';

import { Scrollbars as CustomScrollbar } from 'react-custom-scrollbars';
import LoginNotify from './LoginNotify';
import Discover from './Discover';
import BorderTopContainer from '~/components/BorderTopContainer';

const cx = classNames.bind(styles);

function Sidebar({ suggestedAcc = true, followingAcc = true }) {
    const [hideScrollbar, setHideScrollbar] = useState(true);

    const customScrollbar = (className) => {
        return (props) => <div className={cx(className)} {...props}></div>;
    };

    const { isAuth } = useSelector((state) => state.auth);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner-fixed')}>
                <CustomScrollbar
                    hideTracksWhenNotNeeded
                    autoHide={hideScrollbar}
                    autoHideTimeout={0}
                    renderView={customScrollbar('scrollbar-view')}
                    renderTrackVertical={customScrollbar('scrollbar-track')}
                    renderThumbVertical={customScrollbar('scrollbar-thumb')}
                    onMouseEnter={() => setHideScrollbar(false)}
                    onMouseLeave={() => setHideScrollbar(true)}
                >
                    <div className={cx('content')}>
                        <Navigation />
                        {/* Login Notify */}
                        {!isAuth && <LoginNotify />}

                        {/* Sugges Account */}
                        {suggestedAcc && <SuggestedAccount />}

                        {/* Followed */}
                        {isAuth && followingAcc && <FollowingAccount />}

                        {/* Discover */}
                        <Discover />

                        {/* Footer */}
                        <BorderTopContainer className={cx('footer-container')}>
                            <p className={cx('link-list')}>
                                <a className={cx('link-item')} href="#">
                                    Giới thiệu
                                </a>
                                <a className={cx('link-item')} href="#">
                                    TikTok Browse
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Bảng tin
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Liên Hệ
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Sự nghiệp
                                </a>
                                <a className={cx('link-item')} href="#">
                                    ByteDance
                                </a>
                            </p>
                            <p className={cx('link-list')}>
                                <a className={cx('link-item')} href="#">
                                    TikTok for Good
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Quảng cáo
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Developers
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Transparency
                                </a>
                                <a className={cx('link-item')} href="#">
                                    TikTok Rewards
                                </a>
                            </p>
                            <p className={cx('link-list')}>
                                <a className={cx('link-item')} href="#">
                                    Trợ giúp
                                </a>
                                <a className={cx('link-item')} href="#">
                                    An toàn
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Điều khoản
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Quyền riêng tư
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Creator Portal
                                </a>
                                <a className={cx('link-item')} href="#">
                                    Hướng dẫn cộng đồng
                                </a>
                            </p>
                            <p className={cx('link-list')}>
                                <span className={cx('more')}>Thêm</span>
                            </p>

                            <span className={cx('more')}>© 2022 TikTok - Clone by TaiNH</span>
                        </BorderTopContainer>
                    </div>
                </CustomScrollbar>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    suggestedAcc: PropTypes.bool,
    followingAcc: PropTypes.bool,
};

export default memo(Sidebar);
