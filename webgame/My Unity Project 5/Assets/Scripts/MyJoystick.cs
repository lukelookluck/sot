using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

public class MyJoystick : Joystick
{
    private Vector3 anchoredPosition;

    protected override void Start()
    {
        base.Start();
        //background.gameObject.SetActive(false);
        anchoredPosition = background.anchoredPosition;
    }

    public override void OnPointerDown(PointerEventData eventData)
    {
        background.anchoredPosition = ScreenPointToAnchoredPosition(eventData.position);
        background.gameObject.SetActive(true);
        base.OnPointerDown(eventData);
    }

    public override void OnPointerUp(PointerEventData eventData)
    {
        //background.gameObject.SetActive(false);
        background.anchoredPosition = anchoredPosition;
        base.OnPointerUp(eventData);
    }
}