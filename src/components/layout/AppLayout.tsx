import { Layout, LayoutProps } from 'react-admin';
import { AppBar } from './AppBar';
import { Menu } from './Menu';

export const AppLayout = (props: LayoutProps) => (
    <Layout
        {...props}
        appBar={AppBar}
        menu={Menu}
    />
); 