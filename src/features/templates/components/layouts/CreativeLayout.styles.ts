import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Times-Roman',
    },
    sidebar: {
        width: '2.8in',
        padding: '0.5in 0.5in 0.5in 0.4in', 
        backgroundColor: 'transparent',
    },
    mainContent: {
        flex: 1,
        padding: '0.5in 0.5in 0.5in 0.4in', 
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0f172a',
    },
    sidebarSection: {
        marginBottom: 25,
    },
    sidebarTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#94a3b8', 
        paddingBottom: 2,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    sidebarText: {
        fontSize: 10,
        color: '#334155',
        marginBottom: 5,
        lineHeight: 1.4,
    },
    linksSmall: {
        fontSize: 10,
        color: '#2563eb',
        textDecoration: 'none',
        marginBottom: 5,
    },
    skillItem: {
        fontSize: 10,
        color: '#334155',
        marginBottom: 8,
    },
    mainSection: {
        marginBottom: 0,
    },
    mainTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        borderBottomColor: '#0f172a',
        paddingBottom: 2,
        marginTop: 5, 
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 10.5,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.5,
        marginVertical: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 3,
    },
    itemBold: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    itemDuration: {
        fontSize: 10,
        color: '#0f172a',
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 10.5,
        color: '#475569',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    sidebarSub: {
        fontSize: 10.5,
        color: '#64748b',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    contentItem: {
        marginBottom: 20,
    }
});
