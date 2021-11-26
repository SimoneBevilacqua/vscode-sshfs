import * as React from 'react';
import { promptPath } from '../vscode';
import { FieldBase, Props } from './base';

export interface PathProps<T> extends Props<T>{
    canSelectFolder?: boolean;
}

export class FieldPath extends FieldBase<string | undefined ,   PathProps<string | undefined> > {
    public renderInput() {
        return <div className="FieldPath">
            <button onClick={this.prompt}>Prompt</button>
            <input value={this.state.newValue || ''} onChange={this.onChangeEvent} />
        </div>;
    }
    public onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.onChange(event.target.value || undefined);
    }
    public prompt = async () => {
        try {
            this.onChange(await promptPath(this.props.canSelectFolder));
        } catch (e) {
            console.log('Error while prompting file path', e);
        }
    };
}

