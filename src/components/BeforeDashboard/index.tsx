import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome</h4>
      </Banner>
      <ul className={`${baseClass}__instructions`}>
        <li>
          Edit Header, Footer, and Site Settings from the sidebar. Publish a page, then{' '}
          <a href="/" target="_blank">
            open the site
          </a>{' '}
          to preview it.
        </li>
        <li>
          <SeedButton /> if this database is empty and you want starter content.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
