using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Next : MonoBehaviour, IPointerDownHandler
{
    public GameObject playerHolder;

    public void OnPointerDown(PointerEventData eventData)
    {
        playerHolder.GetComponent<SpawnProjectiles>().Next();
    }

}
