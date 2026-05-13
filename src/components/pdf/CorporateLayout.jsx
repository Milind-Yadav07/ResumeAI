import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: '0.5in',
        fontFamily: 'Times-Roman',
        color: '#111827',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 20,
        marginBottom: 20,
    },
    photoContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 25,
        borderWidth: 2,
        borderColor: '#111827',
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    headerRight: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#111827',
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        fontSize: 10.5,
        color: '#374151',
        fontWeight: 'bold',
    },
    links: {
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 18,
        marginBottom: 8,
    },
    description: {
        fontSize: 10.5,
        color: '#374151',
        textAlign: 'justify',
        lineHeight: 1.6,
        marginVertical: 5,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 5,
        marginBottom: 5, // Added to sync with summary description spacing
    },
    skillTag: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#d1d5db',
        color: '#111827',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 3,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827',
    },
    itemDuration: {
        fontSize: 10,
        color: '#6b7280',
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 10.5,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#4b5563',
        marginBottom: 4,
    },
    projectLink: {
        fontSize: 9.5,
        color: '#2563eb',
        fontWeight: 'bold',
        textDecoration: 'none',
        backgroundColor: '#eff6ff',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
    }
});

const CorporateLayout = ({ data }) => {
    const { personalInfo = {}, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Images Layer */}
            <View
                fixed
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                render={({ pageNumber }) => (
                    <Image
                        src={pageNumber === 1 ? "/Resume Templates/corporateDesign.png" : "/Resume Templates/corporateDesign2.png"}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            />

            {/* Header section */}
            {(personalInfo.name || personalInfo.photo || personalInfo.email) && (
                <View style={styles.header}>
                    {personalInfo.photo && (
                        <View style={styles.photoContainer}>
                            <Image style={styles.photo} src={personalInfo.photo} />
                        </View>
                    )}
                    <View style={styles.headerRight}>
                        {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}
                        <View style={styles.contactInfo}>
                            {personalInfo.email && <Text>{personalInfo.email}</Text>}
                            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                            {personalInfo.location && <Text>{personalInfo.location}</Text>}
                            {personalInfo.links && (
                                <Link 
                                    src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} 
                                    style={styles.links}
                                >
                                    {personalInfo.links}
                                </Link>
                            )}
                        </View>
                    </View>
                </View>
            )}

            {/* Content Sections */}
            {personalInfo.summary && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
                    <Text style={styles.description}>{personalInfo.summary}</Text>
                </View>
            )}

            {skills && skills.length > 0 && skills.some(s => s && s.trim() !== '') && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>SKILLS</Text>
                    <View style={styles.skillsGrid}>
                        {skills.filter(s => s && s.trim() !== '').map((skill, i) => (
                            <Text key={i} style={styles.skillTag}>{skill}</Text>
                        ))}
                    </View>
                </View>
            )}

            {experience && experience.length > 0 && experience.some(exp => exp.role || exp.company) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                    {experience.filter(exp => exp.role || exp.company).map((exp, i, arr) => (
                        <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{exp.role}</Text>
                                <Text style={styles.itemDuration}>{exp.duration}</Text>
                            </View>
                            <Text style={styles.itemSub}>{exp.company}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {projects && projects.length > 0 && projects.some(proj => proj.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROJECTS</Text>
                    {projects.filter(proj => proj.title).map((proj, i, arr) => (
                        <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{proj.title}</Text>
                                {proj.link && (
                                    <Link 
                                        src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                        style={styles.projectLink}
                                    >
                                        View Project
                                    </Link>
                                )}
                            </View>
                            <Text style={styles.description}>{proj.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EDUCATION</Text>
                    {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                        <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{edu.degree}</Text>
                                <Text style={styles.itemDuration}>{edu.year}</Text>
                            </View>
                            <Text style={styles.itemSub}>{edu.school}</Text>
                        </View>
                    ))}
                </View>
            )}

            {achievements && achievements.length > 0 && achievements.some(ach => ach.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AWARDS & ACHIEVEMENTS</Text>
                    {achievements.filter(ach => ach.title).map((ach, i, arr) => (
                        <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <Text style={[styles.itemTitle, { marginBottom: 4 }]}>{ach.title}</Text>
                            <Text style={styles.description}>{ach.description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    );
};

export default CorporateLayout;
