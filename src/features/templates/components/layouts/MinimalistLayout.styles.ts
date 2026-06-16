import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Times-Roman',
        backgroundColor: '#ffffff',
    },
    sidebar: {
        width: '31%',
        padding: '0.5in 0.4in',
        height: '100%',
    },
    mainContent: {
        width: '69%',
        padding: '0.5in 0.5in',
        height: '100%',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 90,
        height: 90,
        borderRadius: 12,
        border: '3pt solid #f8fafc',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 25,
        letterSpacing: -0.5,
    },
    sidebarSection: {
        marginBottom: 25,
    },
    sidebarTitle: {
        fontSize: 9.5,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingBottom: 3, 
    },
    sidebarTitleLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 20,
        height: 2,
        backgroundColor: '#3b82f6',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 9.5,
        color: '#475569',
        marginBottom: 6, 
    },
    skillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 5,
    },
    skillTag: {
        fontSize: 9,
        color: '#475569',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    mainSection: {
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 5,
        paddingBottom: 3, 
    },
    mainTitleLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 2,
        backgroundColor: '#3b82f6',
    },
    summaryText: {
        fontSize: 10.5,
        color: '#475569',
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    contentItem: {
        marginBottom: 18,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6, 
    },
    bold: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    duration: {
        fontSize: 9,
        color: '#94a3b8',
    },
    subtitle: {
        fontSize: 10,
        color: '#1e293b',
        fontWeight: 'bold',
        marginBottom: 6, 
    },
    educationYear: {
        fontSize: 9,
        color: '#94a3b8',
        marginBottom: 5, 
    },
    description: {
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    bulletList: {
        marginTop: 6,
        marginLeft: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bullet: {
        width: 14,
        fontSize: 10,
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.4,
    }
});
