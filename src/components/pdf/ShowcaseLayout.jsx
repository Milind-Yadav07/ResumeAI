import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link, Svg, Path } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Times-Roman',
    },
    frameBorder: {
        paddingTop: '3mm',
        paddingBottom: '3mm',
        paddingHorizontal: '10.5mm',
        width: '100%',
        // NO height constraint - content must flow naturally across pages
    },
    internalPadding: {
        padding: '10pt',
        // NO fixed width - let it fill the frameBorder naturally
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
        paddingBottom: 5.7, // Exactly 2mm gap
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

const ShowcaseLayout = ({ data }) => {
    // Robust data destructuring with fallbacks
    const personalInfo = data?.personalInfo || {};
    const skills = Array.isArray(data?.skills) ? data.skills : [];
    const experience = Array.isArray(data?.experience) ? data.experience : [];
    const education = Array.isArray(data?.education) ? data.education : [];
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    const achievements = Array.isArray(data?.achievements) ? data.achievements : [];

    const renderText = (content) => {
        if (!content) return null;
        if (typeof content !== 'string') return <Text style={styles.description}>{String(content)}</Text>;
        return <Text style={styles.description}>{content}</Text>;
    };

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <View
                fixed
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                render={({ pageNumber }) => (
                    <Image
                        src={pageNumber === 1 ? "/Resume Templates/showcaseDesign.png" : "/Resume Templates/simpleDesign.png"}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            />

            <View style={styles.frameBorder}>
                <View style={styles.internalPadding}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.name}>{personalInfo.name || 'YOUR NAME'}</Text>
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

                    {/* Summary */}
                    {personalInfo.summary && (
                        <View style={styles.section} wrap={false}>
                            <Text style={styles.sectionTitle}>Professional Summary</Text>
                            <View style={styles.sectionContent}>
                                {renderText(personalInfo.summary)}
                            </View>
                        </View>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <View style={styles.section} wrap={false}>
                            <Text style={styles.sectionTitle}>Skills</Text>
                            <View style={styles.skillsGrid}>
                                {skills.filter(s => s && String(s).trim()).map((skill, i) => (
                                    <Text key={i} style={styles.skillTag}>{String(skill)}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            <View style={styles.sectionContent}>
                                {experience.map((exp, i) => (
                                    <View key={i} style={i === experience.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{exp.role || exp.jobTitle || exp.position || 'Position'}</Text>
                                            <Text style={styles.itemDuration}>{exp.duration || ''}</Text>
                                        </View>
                                        <Text style={styles.itemSub}>{exp.company || exp.organization || ''}</Text>
                                        {renderText(exp.description || exp.summary || exp.details)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Projects</Text>
                            <View style={styles.sectionContent}>
                                {projects.map((proj, i) => (
                                    <View key={i} style={i === projects.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{proj.title || 'Project Name'}</Text>
                                            {proj.link && (
                                                <Link 
                                                    src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                                    style={styles.projectLink}
                                                >
                                                    View Project
                                                </Link>
                                            )}
                                        </View>
                                        {renderText(proj.description || proj.summary || proj.details || proj.projectDescription)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Educational Background</Text>
                            <View style={styles.sectionContent}>
                                {education.map((edu, i) => (
                                    <View key={i} style={i === education.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{edu.degree || edu.course || 'Degree'}</Text>
                                            <Text style={styles.itemDuration}>{edu.year || ''}</Text>
                                        </View>
                                        <Text style={styles.itemSub}>{edu.school || edu.university || ''}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Notable Achievements</Text>
                            <View style={styles.sectionContent}>
                                {achievements.map((ach, i) => (
                                    <View key={i} style={i === achievements.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{ach.title || ach.award || 'Achievement'}</Text>
                                        </View>
                                        {renderText(ach.description || ach.summary || ach.details)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Page>
    );
};

export default ShowcaseLayout;
