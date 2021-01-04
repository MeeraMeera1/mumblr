import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../store/posts';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function DashboardPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const currentPosts = useSelector(fullReduxState => {
        return fullReduxState.posts.posts;
    });

    const newPost = useSelector(fullReduxState => {
        return fullReduxState.posts.post;
    });

    useEffect(async () => {
        dispatch(
            fetchAllPosts()
        );
    }, []);

    useEffect(() => {
        const dashboardContainer = document.querySelector('.dashboard-container');

        if (dashboardContainer && newPost) {
            const newPostDiv = document.createElement('div');
            newPostDiv.innerHTML = newPost;
            dashboardContainer.prepend(newPostDiv);
        }
    }, [newPost]);

if (!sessionUser) return <Redirect to="/" /> 

}