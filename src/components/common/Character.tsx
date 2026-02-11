/**
 * Character - GIVY 캐릭터 컴포넌트
 * PNG 이미지 기반 캐릭터 디자인
 *
 * 캐릭터 타입:
 * - coin: 동전 캐릭터
 * - paper-money: 지폐 캐릭터
 * - card: 카드 캐릭터
 * - bankbook: 통장 캐릭터
 *
 * 변형(variant):
 * - default: 기본
 * - question: 물음표 (coin만)
 * - exclamation: 느낌표 (coin만)
 * - profile: 프로필 (coin만)
 * - party1: 파티1 (coin만)
 * - party2: 파티2 (coin만)
 * - photo: 사진 (coin만)
 *
 * @param type - 캐릭터 타입
 * @param variant - 캐릭터 변형 (기본: default)
 * @param width - 너비 (선택)
 * @param height - 높이 (선택, 'auto'면 비율 유지)
 */

// PNG 이미지 imports
import coinDefault from '../../assets/images/png/img_charater_coin_default.png';
import coinQuestion from '../../assets/images/png/img_charater_coin_question.png';
import coinExclamation from '../../assets/images/png/img_charater_coin_exclamation.png';
import coinProfile from '../../assets/images/png/img_charater_coin_profile.png';
import coinParty1 from '../../assets/images/png/img_charater_coin_party1.png';
import coinParty2 from '../../assets/images/png/img_charater_coin_party2.png';
import coinPhoto from '../../assets/images/png/img_charater_coin_photo.png';
import paperMoneyDefault from '../../assets/images/png/img_charater_paper-money_default.png';
import cardDefault from '../../assets/images/png/img_charater_card_default.png';
import bankbookDefault from '../../assets/images/png/img_charater_bankbook_default.png';

type CharacterType = 'coin' | 'paper-money' | 'card' | 'bankbook';
type CoinVariant = 'default' | 'question' | 'exclamation' | 'profile' | 'party1' | 'party2' | 'photo';

interface CharacterProps {
  type: CharacterType;
  variant?: CoinVariant;
  width?: string;
  height?: string;
}

const characterImages: Record<string, string> = {
  'coin-default': coinDefault,
  'coin-question': coinQuestion,
  'coin-exclamation': coinExclamation,
  'coin-profile': coinProfile,
  'coin-party1': coinParty1,
  'coin-party2': coinParty2,
  'coin-photo': coinPhoto,
  'paper-money-default': paperMoneyDefault,
  'card-default': cardDefault,
  'bankbook-default': bankbookDefault,
};

const characterAltText: Record<CharacterType, string> = {
  'coin': '동전 캐릭터',
  'paper-money': '지폐 캐릭터',
  'card': '카드 캐릭터',
  'bankbook': '통장 캐릭터',
};

function Character({ type, variant = 'default', width = '70px', height = 'auto' }: CharacterProps) {
  const imageKey = `${type}-${variant}`;
  const imageSrc = characterImages[imageKey] || characterImages[`${type}-default`];
  const altText = characterAltText[type];

  return (
    <img
      src={imageSrc}
      alt={altText}
      style={{
        width,
        height,
        objectFit: 'contain',
      }}
    />
  );
}

export default Character;
