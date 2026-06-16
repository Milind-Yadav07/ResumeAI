import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Times-Roman',
    },
    frameBorder: {
        paddingTop: '3mm',
        paddingBottom: '3mm',
        paddingHorizontal: '10.5mm',
        width: '100%',
    },
    internalPadding: {
        padding: '10pt',
    },
    header: {
        textAlign: 'center',
        paddingTop: '10pt',
        paddingBottom: '20pt',
        marginBottom: '45pt',
        minHeight: '100pt',
        justifyContent: 'center',
    },
    name: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: -15,
        marginBottom: 18,
        color: '#000000',
        letterSpacing: 1,
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        flexWrap: 'wrap',
    },
    links: {
        color: 'blue',
        textDecoration: 'none',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomWidth: 0.75,
        borderBottomColor: '#a1811a',
        paddingBottom: 5.7, 
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionContent: {
        paddingLeft: 20,
    },
    description: {
        fontSize: 10.5,
        textAlign: 'justify',
        lineHeight: 1.6,
        color: '#000000',
        marginVertical: 4,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 3,
    },
    itemTitle: {
        fontSize: 11.5,
        fontWeight: 'bold',
        color: '#000000',
    },
    itemDuration: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000000',
    },
    itemSub: {
        fontSize: 10.5,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000000',
        marginBottom: 5,
    },
    experienceItem: {
        marginBottom: 18,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingLeft: 20,
        marginTop: 10,
    },
    skillTag: {
        borderWidth: 1.5,
        borderColor: '#c4b5fd',
        color: '#000000',
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 15,
        fontSize: 10,
        fontWeight: 'bold',
    },
    projectLink: {
        fontSize: 9.5,
        color: 'blue',
        fontWeight: 'bold',
        textDecoration: 'none',
    }
});
