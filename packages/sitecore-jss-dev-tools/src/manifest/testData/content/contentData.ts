export default {
  name: 'DownloadForm',
  displayName: 'Download Form',
  template: 'FormContent',
  fields: {
    title: {
      value: 'Hello World',
    },
    body: {
      value:
        // eslint-disable-next-line prettier/prettier
        '<p> <strong> <em>Please note that if you are an existing or new licensee or Whack Whack Star Solutions Solution Partner with a valid agreement to use the Whack Whack Star Solutions Software (\'Existing Agreement\'), the below license agreement is not intended to in any way modify or replace your Existing Agreement. If your Existing Agreement conflicts with the below license agreement, the terms of your Existing Agreement will prevail.</em> </strong>&nbsp; </p> <p>&nbsp;</p> <p align=\'center\'> <b> <span>Whack Whack Star Solutions License Agreement</span> </b> </p> <p> <b> <span>LICENSEE’S USE OF THE Whack Whack Star Solutions SOFTWARE IS SUBJECT TO LICENSEE’S FULL ACCEPTANCE OF THE TERMS, CONDITIONS, DISCLAIMERS AND LICENSE RESTRICTIONS SET FORTH IN THIS AGREEMENT. </span> </b> </p> <p> <b> <span lang=\'EN-GB\'>1. <u>License Grant</u></span> </b> <span lang=\'EN-GB\'>: Upon payment in full of the license fee, Licensor grants Licensee a non-exclusive, perpetual, non-transferable, non-assignable, non-sublicensable license, without time limitations, to use the Whack Whack Star Solutions Software in supported configurations as described in the Documentation, in compliance with all applicable laws, in object code form only,</span> <span lang=\'EN-GB\'>exclusively for the Permitted Usage (as that term is defined in Exhibit A)</span> <span lang=\'EN-GB\'>, subject to the terms and conditions set forth in this Agreement and Exhibits A and B hereto, which are incorporated herein and made a part of this Agreement.</span> <span lang=\'EN-GB\'>Except as expressly authorized by this Agreement, \'Licensee\' as used herein does not include any other entity or person, including any present or future subsidiary or affiliate of Licensee, or any entity or person owning any interest in Licensee at present or in the future.</span> <span lang=\'EN-GB\'>Whack Whack Star Solutions Software\' means the software that is licensed by Licensor in this Agreement, and any future Upgrades and Patches, as those terms are defined in Section 6 of this Agreement, that the Licensee may receive in accordance with the terms of the Agreement. \'Documentation\' means the resources made available in the reference section of the Whack Whack Star Solutions Developer Network setting forth the then-current functional, operational, and performance capabilities of the Whack Whack Star Solutions Software (http://wwss.net/documentation).</span> </p>',
    },
    image: {
      value: {
        src: '/assets/img/content-image-0.jpg',
        alt: 'sample',
      },
    },
  },
};
