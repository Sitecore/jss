// TODO: FIX AssertionError and TypeError
// replacePersonalizedComponentsWithLoaderComponents
// getPersonalizedComponents (???)

import { expect } from 'chai';
import { ComponentRendering } from '../layout/models';
import { LayoutPersonalizationUtils } from './layout-personalization-utils';

describe('LayoutPersonalizationUtils', () => {
    describe('replacePersonalizedComponentsWithLoaderComponents', () => {

        let layoutPersonalizationUtils: LayoutPersonalizationUtils;
        let mockPlaceholdersJson: {};
        const personalizationComponentName = 'PersonalizationLoadingComponent';

        beforeEach(() => {
            layoutPersonalizationUtils = new LayoutPersonalizationUtils();
        });

        it('should skip if not placeholder', () => {
            // TODO: emulate NOT 'placeholder JSON'
            mockPlaceholdersJson =
            {
                uid: "e02ddb9b-a062-5e50-924a-1940d7e053ce",
                componentName: "ContentBlock",
                dataSource: "{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}",
                fields: {
                    heading: {
                        value: "JSS Styleguide"
                    },
                    content: {
                        value: "<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href=\"https://jss.sitecore.net\" target=\"_blank\" rel=\"noopener noreferrer\">the documentation</a>.</p>\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\n"
                    }
                },
                personalization: {
                    hiddenByDefault: false
                }
            };

            expect(layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(mockPlaceholdersJson, personalizationComponentName)).to.throw(TypeError, 'placeholder.forEach is not a function');
            let result = mockPlaceholdersJson as ComponentRendering;
            expect(result['componentName'] as string).to.not.equal(personalizationComponentName);
        });

        it('should return forEach error if no key in placeholder', () => {
            mockPlaceholdersJson = [
                {
                    uid: "e02ddb9b-a062-5e50-924a-1940d7e053ce",
                    componentName: "ContentBlock",
                    dataSource: "{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}",
                    fields: {
                        heading: {
                            value: "JSS Styleguide"
                        },
                        content: {
                            value: "<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href=\"https://jss.sitecore.net\" target=\"_blank\" rel=\"noopener noreferrer\">the documentation</a>.</p>\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\n"
                        }
                    },
                    personalization: {
                        hiddenByDefault: false
                    }
                }
            ];

            expect(layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(mockPlaceholdersJson, personalizationComponentName)).to.throw(TypeError, 'placeholder.forEach is not a function');
            let result = mockPlaceholdersJson as ComponentRendering;
            expect(result['componentName']).to.not.equal(personalizationComponentName);

        });

        it('should skip if component is not componentRendering', () => {
            mockPlaceholdersJson = {
                "jss-main": [
                    {
                        uid: "e02ddb9b-a062-5e50-924a-1940d7e053ce",
                        dataSource: "{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}",
                        fields: {
                            heading: {
                                value: "JSS Styleguide"
                            },
                            content: {
                                value: "<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href=\"https://jss.sitecore.net\" target=\"_blank\" rel=\"noopener noreferrer\">the documentation</a>.</p>\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\n"
                            }
                        },
                        personalization: {
                            hiddenByDefault: false
                        }
                    }
                ]
            };

            expect(layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(mockPlaceholdersJson, personalizationComponentName)).to.throw(TypeError, 'placeholder.forEach is not a function');
            let result = mockPlaceholdersJson as ComponentRendering;
            expect(result['componentName']).to.not.equal(personalizationComponentName);
        });

        it('should change JSON structure and component name if personalization section exists', () => {
            mockPlaceholdersJson = {
                "jss-main": [
                    {
                        uid: "e02ddb9b-a062-5e50-924a-1940d7e053ce",
                        componentName: "ContentBlock",
                        dataSource: "{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}",
                        fields: {
                            heading: {
                                value: "JSS Styleguide"
                            },
                            content: {
                                value: "<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href=\"https://jss.sitecore.net\" target=\"_blank\" rel=\"noopener noreferrer\">the documentation</a>.</p>\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\n"
                            }
                        },
                        personalization: {
                            hiddenByDefault: false
                        }
                    },
                    {
                        uid: "34a6553c-81de-5cd3-989e-853f6cb6df8c",
                        componentName: "Styleguide-Layout",
                        dataSource: "",
                        placeholders: {
                            "jss-styleguide-section": [
                                {
                                    uid: "538e4831-f157-50bb-ac74-277fcac9fddb",
                                    componentName: "Styleguide-Layout-Tabs",
                                    dataSource: "{9A118561-DB56-542A-A876-553BBA28DB57}",
                                    fields: {
                                        heading: {
                                            value: "Tabs"
                                        },
                                        description: {
                                            value: "<p>Creating hierarchical components like tabs is made simpler in JSS because it's easy to introspect the layout structure.</p>"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            };
            expect(layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(mockPlaceholdersJson, personalizationComponentName)).to.not.throw(TypeError, 'placeholder.forEach is not a function');
            let result = mockPlaceholdersJson as ComponentRendering;
            expect(result['componentName']).to.equal(personalizationComponentName);
        });

        it('should be the same componentName if personalization section does not exist', () => {
            mockPlaceholdersJson = {
                "jss-main": [
                    {
                        uid: "e02ddb9b-a062-5e50-924a-1940d7e053ce",
                        dataSource: "{C4BA1BA0-2D7A-5BDB-9C33-6891174EF4F6}",
                        fields: {
                            heading: {
                                value: "JSS Styleguide"
                            },
                            content: {
                                value: "<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href=\"https://jss.sitecore.net\" target=\"_blank\" rel=\"noopener noreferrer\">the documentation</a>.</p>\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\n"
                            }
                        }
                    }
                ]
            };

            expect(layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents(mockPlaceholdersJson, personalizationComponentName)).to.throw(TypeError, 'placeholder.forEach is not a function');
            let result = mockPlaceholdersJson as ComponentRendering;
            expect(result['componentName']).to.not.equal(personalizationComponentName);
        });
    })
})
