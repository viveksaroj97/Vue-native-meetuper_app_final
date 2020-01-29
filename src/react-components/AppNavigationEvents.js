import React from 'react'
import { NavigationEvents } from 'react-navigation'

class AppNavigationEvents extends React.Component {

    render () {
        const {onDidFocus} = this.props
        return (
        <NavigationEvents onDidFocus = {onDidFocus} />
        // <NavigationEvents {...this.props}  />
        // We can use ... when name of props are same 
        )
    }
}


export default AppNavigationEvents