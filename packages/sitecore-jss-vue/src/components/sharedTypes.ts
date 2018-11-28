import { Component } from 'vue';

export type ComponentFactory = (componentName: string) => Component;
