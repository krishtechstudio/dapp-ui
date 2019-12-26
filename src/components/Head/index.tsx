/** @jsx jsx */
import React from "react";
import { css, jsx } from '@emotion/core'
import Account from "@components/Home/Account";
import styled from "@emotion/styled";
import logo from '@src/assets/icons/logo.svg'
import { fonts } from "@src/styles";
import Input from "@components/Input";
import { inject, observer } from "mobx-react";
import HistoryStore from "@stores/HistoryStore";
import { autorun } from "mobx";

interface IProps {
    historyStore?: HistoryStore
    withSearch?: boolean
}

const LogoWrapper = styled.div`
display: flex;
width: 20%;
justify-content: center; 
padding-left: 10%;
flex-shrink: 0;
@media(max-width: 768px){
  padding-left: 0;
  justify-content: center;
  width: 100%; 
}
`

const Root = styled.div`
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100px;
          position: fixed;top: 0;left: 0;right: 0;
          z-index: 1;
  `;


@inject('historyStore')
@observer
export default class Head extends React.Component<IProps, { value: string }> {

    state = {value: this.props.historyStore!.currentPath};

    componentDidMount() {
        autorun(() => this.setState({value: this.props.historyStore!.currentPath}))
    }


    handleKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && this.props.historyStore!.handleSearch(this.state.value || '');
    handleChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => this.setState({value});

    render() {
        const {value} = this.state;
        return <Root css={ css`background: ${this.props.withSearch
            ? 'linear-gradient(180deg, #F8F9FB 65.31%, rgba(248, 249, 251, 0) 100%);'
            : 'transparent'}`}>
            <LogoWrapper><a href="/"><img src={logo} alt={'Logo'}/></a></LogoWrapper>
            {this.props.withSearch &&
            <div css={css`display: flex; align-items: center; width: 100%;white-space: nowrap`}>
                <div css={[fonts.descriptionFont, css`margin-right: 8px`]}>Smart Contract:</div>
                <Input
                    css={css``}
                    value={value}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                />
            </div>}
            <Account/>
        </Root>;
    }

}


