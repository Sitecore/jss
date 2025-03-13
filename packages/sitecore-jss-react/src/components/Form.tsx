import React, { useEffect, useRef, useState } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import {
  executeScriptElements,
  loadForm,
  subscribeToFormSubmitEvent,
} from '@sitecore-jss/sitecore-jss/form';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';

/**
 * Shape of the Form component rendering data.
 * FormId is the rendering parameter that specifies the ID of the Sitecore Form to render.
 */
export type FormProps = {
  rendering: ComponentRendering;
  params: {
    /**
     * The ID of the Sitecore Form to render.
     */
    FormId: string;
    /**
     * The CSS class to apply to the form.
     */
    styles?: string;
    /**
     * The unique identifier of the rendering.
     */
    RenderingIdentifier?: string;
  };
};

export const Form = ({ params, rendering }: FormProps) => {
  const id = params?.RenderingIdentifier;
  const [error, setError] = useState(false);
  const [content, setContent] = useState('');
  const context = useSitecoreContext();
  const formRef = useRef<HTMLDivElement>(null);

  const isEditing = context.sitecoreContext.pageEditing;

  useEffect(() => {
    if (!content) {
      loadForm(context.api?.edge?.contextId, params.FormId, context.api?.edge?.edgeUrl)
        .then(setContent)
        .catch(() => {
          if (isEditing) {
            console.error(
              `Failed to load form with id ${params.FormId}. Check debug logs for sitecore-jss:form for more details.`
            );
          }
          setError(true);
        });
    } else {
      // If we are in editing mode, we don't want to send any events
      if (!isEditing) {
        subscribeToFormSubmitEvent(formRef.current, rendering.uid);
      }

      executeScriptElements(formRef.current);
    }
  }, [content]);

  if (isEditing) {
    if (error) {
      return (
        <div className="sc-jss-placeholder-error">There was a problem loading this section</div>
      );
    }
  }

  return (
    <div
      ref={formRef}
      dangerouslySetInnerHTML={{ __html: content }}
      className={params.styles?.trimEnd()}
      id={id ? id : undefined}
    ></div>
  );
};
