import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: '0.5in',
        fontFamily: 'Times-Roman',
        color: '#1a1a1a',
    },
    header: {
        textAlign: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        fontSize: 9.5,
        color: '#475569',
    },
    links: {
        color: '#3b82f6',
        textDecoration: 'none',
    },
    section: {
        marginBottom: 0, 
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#1a1a1a',
        paddingBottom: 2,
        marginTop: 9, 
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 10,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.4,
        marginTop: 4,
        marginBottom: 0, 
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#f1f3f6',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        fontSize: 9.5,
        color: '#334155',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    itemBold: {
        fontSize: 10.5,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    itemDuration: {
        fontSize: 10,
        color: '#374151',
    },
    itemSub: {
        fontSize: 10,
        color: '#334155',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    projectLink: {
        fontSize: 9.5, 
        color: '#3b82f6',
        textDecoration: 'none',
        marginLeft: 10,
    },
    contentItem: {
        marginBottom: 12, 
    }
});
