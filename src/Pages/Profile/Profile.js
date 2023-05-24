import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';

import styles from './Profile.module.scss';
import Img from '~/components/Img';
import Button from '~/components/Button';
import SvgIcon from '~/components/SvgIcon';
import {
    iconBlock,
    iconFlag,
    iconLinkRegular,
    iconSeeMoreHorizontal,
    iconShareRegular,
} from '~/components/SvgIcon/iconsRepo';
import PopperWrapper from '~/components/Popper';
import VideoProfile from './VideoProfile';
import AvatarLoading from '~/components/Loadings/AvatarLoading';
import LineLoadingMedium from '~/components/Loadings/LineLoadingMedium';
import ShowTick from '~/components/ShowTick';
import NotFoundNotify from '~/components/NotFound/NotFoundNotify';
import { ModalContextKey } from '~/contexts/ModalContext';
import { accountService } from '~/services';
import SharePopper from '~/components/Shares/SharePopper';
import dataTemp from '~/temp/data';

const cx = classNames.bind(styles);

function Profile() {
    const [infoUser, setInfoUser] = useState(null);
    const [videoData, setVideoData] = useState(null);

    const { username: usernameParams } = useParams();
    const { loginModalShow } = useContext(ModalContextKey);

    // get data from temp data
    const { profileShares } = dataTemp.shares;
    const customTippy = {
        placement: 'bottom-end',
        offset: [26, 6],
        delay: [150, 400],
        appendTo: document.body,
    };

    const {
        nickname: username,
        first_name: firstName,
        last_name: lastName,
        avatar: avatarUrl,
        tick,
        followers_count: followersCount,
        followings_count: followingsCount,
        likes_count: likesCount,
        bio,
        website_url: websiteAddress,
    } = infoUser || {};

    useEffect(() => {
        const getUserInfo = async () => {
            const dataResponse = await accountService.getUserAccount(usernameParams);

            // set user data
            setInfoUser(dataResponse);

            // set video data
            const videos = dataResponse?.videos;
            const likedVideos = [];
            setVideoData([videos, likedVideos]);
        };
        getUserInfo();

        setInfoUser(null);
        setVideoData(null);
    }, [usernameParams]);

    return (
        <div className={cx('wrapper')}>
            {/* Info is loading */}
            {infoUser === null && (
                <header style={{ marginBottom: 40 }} className={cx('user-container')}>
                    <div className={cx('account-info')}>
                        <AvatarLoading />
                        <div style={{ marginTop: 16 }}>
                            <LineLoadingMedium />
                            <LineLoadingMedium />
                        </div>
                    </div>
                </header>
            )}

            {/* Not found */}
            {infoUser === undefined && (
                <NotFoundNotify
                    title="Không thể tìm thấy tài khoản này"
                    content="Bạn đang tìm kiếm video? Hãy thử duyệt tìm các tác giả, hashtag và âm thanh thịnh hành của chúng
                    tôi."
                />
            )}

            {/* Info ok */}
            {!!infoUser && (
                <header className={cx('user-container')}>
                    <div className={cx('action')}>
                        <SharePopper data={profileShares} customTippy={customTippy} arrowTop>
                            <span className={cx('icon')}>
                                <SvgIcon icon={iconShareRegular} />
                            </span>
                        </SharePopper>

                        <TippyHeadless
                            interactive
                            placement="bottom-end"
                            delay={[0, 400]}
                            offset={[8, 10]}
                            zIndex={10000}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <PopperWrapper className={cx('more-popper')}>
                                        <div className={cx('arrow-popper')} data-popper-arrow />
                                        <Button
                                            className={cx('more-item')}
                                            textClassName={cx('item__text')}
                                            primary
                                            leftIcon={<SvgIcon icon={iconFlag} size={16} />}
                                        >
                                            Báo cáo
                                        </Button>
                                        <Button
                                            className={cx('more-item')}
                                            textClassName={cx('item__text')}
                                            primary
                                            leftIcon={<SvgIcon icon={iconBlock} size={16} />}
                                        >
                                            Chặn
                                        </Button>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <span className={cx('icon')}>
                                <SvgIcon icon={iconSeeMoreHorizontal} />
                            </span>
                        </TippyHeadless>
                    </div>
                    <div className={cx('account-info')}>
                        <Img src={avatarUrl} alt={username} />
                        <div>
                            <h2 className={cx('account__username')}>
                                {username} <ShowTick tick={tick} size={20} />
                            </h2>
                            <h1 className={cx('account__fullname')}>{`${firstName} ${lastName}`}</h1>
                            <Button className={cx('follow-btn')} color medium onClick={loginModalShow}>
                                Follow
                            </Button>
                        </div>
                    </div>
                    <div className={cx('count-info')}>
                        <strong className={cx('num__count')}>{followingsCount}</strong>
                        <span className={cx('title__count')}>Đang Follow</span>
                        <strong className={cx('num__count')}>{followersCount}</strong>
                        <span className={cx('title__count')}>Follower</span>
                        <strong className={cx('num__count')}>{likesCount}</strong>
                        <span className={cx('title__count')}>Thích</span>
                    </div>

                    <p className={cx('bio-info')}>{bio || 'Chưa có tiểu sử'}</p>

                    {websiteAddress && (
                        <a href={websiteAddress} className={cx('website-info')} target="_blank" rel="noreferrer">
                            <SvgIcon className={cx('icon')} icon={iconLinkRegular} size={18} />
                            {websiteAddress}
                        </a>
                    )}
                </header>
            )}

            {/* Video Space */}
            {infoUser !== undefined && <VideoProfile user={username} data={videoData} />}
        </div>
    );
}

export default Profile;
