import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Times-Roman',
        flexDirection: 'row',
    },
    sidebar: {
        width: '32%',
        padding: '0.4in 0.25in',
        color: '#ffffff',
    },
    main: {
        width: '68%',
        padding: '0.5in',
        backgroundColor: 'transparent',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        border: '2pt solid #c9a84c',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffff',
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#c9a84c',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#c9a84c',
        paddingBottom: 5,
        marginBottom: 10,
        letterSpacing: 1.5,
    },
    contactItem: {
        flexDirection: 'row',
        marginBottom: 6,
        fontSize: 9.5,
        alignItems: 'center',
    },
    contactIcon: {
        color: '#c9a84c',
        marginRight: 8,
        fontSize: 10,
    },
    sidebarText: {
        fontSize: 9.5,
        color: '#f1f5f9',
        lineHeight: 1.4,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    skillDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#c9a84c',
        marginRight: 7,
    },
    eduItem: {
        marginBottom: 12,
    },
    eduDegree: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 2,
    },
    eduSchool: {
        fontSize: 9.5,
        color: '#cbd5e1',
    },
    eduYear: {
        fontSize: 9,
        color: '#c9a84c',
        marginTop: 2,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1b2a4a',
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        borderBottomColor: '#1b2a4a',
        paddingBottom: 6,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        color: '#c9a84c',
        marginRight: 8,
    },
    description: {
        fontSize: 10.5,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.5,
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
        color: '#1b2a4a',
    },
    duration: {
        fontSize: 9.5,
        color: '#64748b',
    },
    itemSub: {
        fontSize: 10,
        color: '#c9a84c',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    diamondIcon: {
        marginRight: 6,
    }
});
