import { AsideHeader } from '@gravity-ui/navigation';
import React from 'react';

import { Bug, Gear } from '@gravity-ui/icons';

export const Aside = () => {
  const [compact, setCompact] = React.useState(false);
  return (
    <AsideHeader
      logo={{
        text: 'Service',
        icon: Bug,
        href: '#',
        onClick: () => alert('click on logo'),
        'aria-label': 'Service'
      }}
      onChangeCompact={setCompact}
      compact={compact}
      menuItems={[
        {
          id: '1',
          title: 'item 1',
          icon: Gear,
          tooltipText: ''
        },
        {
          id: '2',
          title: 'item 2',
          icon: Gear
        },
        {
          id: '3',
          title: 'item 3',
          icon: Gear
        },
        {
          id: '4',
          title: 'item 4',
          icon: Gear
        }
      ]}
      renderContent={() => <>CONTENT</>}
    />
  );
};
