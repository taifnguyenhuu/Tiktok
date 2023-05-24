import { memo, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Img from '~/components/Img';
import ShowTick from '~/components/ShowTick';
import SvgIcon from '~/components/SvgIcon';
import { iconHeartRegular } from '~/components/SvgIcon/iconsRepo';
import styles from './CommentShow.module.scss';
import AccountPreview from '~/components/Items/AccountItem/AccountPreview';

const cx = classNames.bind(styles);

function CommentShow({ data, onCloseModal }) {
    const {
        comment,
        likes_count: likesCount,
        created_at,
        user: {
            first_name: firstName,
            last_name: lastName,
            nickname: userName,
            avatar: avatarUrl,
            followers_count: followersCount,
            likes_count: userLikesCount,
            tick,
            bio,
        },
    } = data;

    const wrapperRef = useRef();

    const createdAt = created_at.slice(0, 10);

    const AccPreview = ({ children, customs = {} }) => {
        return (
            <AccountPreview
                avatarUrl={avatarUrl}
                userName={userName}
                fullName={`${firstName} ${lastName}`}
                tick={tick}
                followerCount={followersCount}
                likeCount={userLikesCount}
                bio={bio}
                customTippy={{
                    zIndex: 9,
                    offset: [-50, 20],
                    popperOptions: { modifiers: [{ name: 'flip', enabled: true }] },
                    appendTo: undefined,
                    ...customs,
                }}
                onCloseModal={onCloseModal}
            >
                {children}
            </AccountPreview>
        );
    };
    return (
        <div className={cx('comment-item')} ref={wrapperRef}>
            <Link to={'/@' + userName} className={cx('avatar-wrapper')} onClick={onCloseModal}>
                <AccPreview customs={{ offset: [2, 4] }}>
                    <Img className={cx('avatar')} src={avatarUrl} />
                </AccPreview>
            </Link>
            <div className={cx('body')}>
                <AccPreview>
                    <Link to={'/@' + userName} className={cx('fullname')} onClick={onCloseModal}>
                        {`${firstName} ${lastName}`} <ShowTick tick={tick} />
                    </Link>
                </AccPreview>
                <p className={cx('content')}>{comment}</p>
                <p className={cx('other')}>
                    <span>{createdAt}</span>
                    <span className={cx('reply')}>Trả lời</span>
                </p>
            </div>
            <div className={cx('like-comment')}>
                <SvgIcon icon={iconHeartRegular} size={20} />
                <span className={cx('like-count')}>{likesCount}</span>
            </div>
        </div>
    );
}
export default memo(CommentShow);
