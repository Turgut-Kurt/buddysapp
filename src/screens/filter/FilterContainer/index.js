import * as React from 'react';

import Filter from '../index';

export interface Props {
  navigation: any;
  mainStore: any;
  profileStore: any;
}
export interface State { }

class FilterContainer extends React.Component<Props, State> {
  render() {
    const what_find__in = [
      { key: 1, value: 'Arkadaş', name: 'FR' },
      { key: 2, value: 'İlişki', name: 'RL' },
      { key: 3, value: 'Hızlı', name: 'SP' },
    ];
    const choise__in = [
      { key: 1, value: 'Kadın', name: 'WM' },
      { key: 2, value: 'Erkek', name: 'MN' },
      { key: 3, value: 'Aseksüel', name: 'AS' },
      { key: 4, value: 'Biseksüel', name: 'BI' },
      { key: 5, value: 'Panseksüel', name: 'BI' },
      { key: 6, value: 'Sapyoseksüel', name: 'SP' },
    ];
    const gender_choices__in = [
      { key: 1, value: '18-25', name: 'OY' },
      { key: 2, value: '25-40', name: 'YK' },
      { key: 3, value: '40-65', name: 'KA' },
    ];
    const weight__in = [
      { key: 1, value: '40-60', name: 'ZY' },
      { key: 2, value: '60-80', name: 'NR' },
      { key: 3, value: '80-120', name: 'KL' },
    ];
    const size__in = [
      { key: 1, value: '1.40-1.50', name: 'KS' },
      { key: 2, value: '1.60-1.75', name: 'NR' },
      { key: 3, value: '+1.75', name: 'UZ' },
    ];
    const faith__in = [
      { key: 1, value: 'Müslüman', name: 'MS' },
      { key: 2, value: 'Hristiyan', name: 'HR' },
      { key: 3, value: 'Yahudi', name: 'YH' },
      { key: 4, value: 'Hinduzm', name: 'HN' },
      { key: 5, value: 'Deist', name: 'DS' },
      { key: 6, value: 'Ateist', name: 'AT' },
      { key: 7, value: 'Şamanizm', name: 'ŞN' },
      { key: 6, value: 'Diğer', name: 'DG' },
    ];
    const zodiac__in = [
      { key: 1, value: 'Koç', name: 'KC' },
      { key: 2, value: 'Boğa', name: 'BG' },
      { key: 3, value: 'İkizler', name: 'IK' },
      { key: 4, value: 'Yengeç', name: 'YN' },
      { key: 5, value: 'Aslan', name: 'AS' },
      { key: 6, value: 'Başak', name: 'BŞ' },
      { key: 7, value: 'Terazi', name: 'TR' },
      { key: 8, value: 'Akrep', name: 'AK' },
      { key: 9, value: 'Yay', name: 'YY' },
      { key: 10, value: 'Oğlak', name: 'OG' },
      { key: 11, value: 'Kova', name: 'KV' },
      { key: 12, value: 'Balık', name: 'BL' },
    ];
    const ten__in = [
      { key: 1, value: 'Esmer', name: 'ES' },
      { key: 2, value: 'Kumral', name: 'KM' },
      { key: 3, value: 'Sarışın', name: 'SR' },
      { key: 4, value: 'Melez', name: 'ML' },
      { key: 5, value: 'Buğday', name: 'BG' },
      { key: 6, value: 'Beyaz', name: 'BY' },
      { key: 7, value: 'Siyahi', name: 'SY' },
    ];

    return (
      <Filter
        navigation={this.props.navigation}
        what_find__in={what_find__in}
        choise__in={choise__in}
        gender_choices__in={gender_choices__in}
        weight__in={weight__in}
        size__in={size__in}
        faith__in={faith__in}
        zodiac__in={zodiac__in}
        ten__in={ten__in}
      />
    );
  }
}

export default FilterContainer;
